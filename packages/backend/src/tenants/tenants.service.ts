import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Action } from 'src/casl/casl-ability.factory';
import { frisk } from 'src/casl/frisk';
import { WithCount } from 'src/common/dto/paginated.dto';
import { UpdateIndexEvent } from 'src/events/update-index.event';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { TenantIndexed } from 'src/tenants/dto/tenant-indexed';
import { TenantPageOptionsDto } from 'src/tenants/dto/tenant-page-options.dto';
import {
  CreateTenantDto,
  TenantDto,
  UpdateTenantDto,
} from 'src/tenants/dto/tenant.dto';

@Injectable()
export class TenantsService {
  constructor(
    private prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  SubjectType = 'Tenant' as const;
  IndexName = 'tenant' as const;
  IndexConstructor = TenantIndexed;

  async create({
    createTenantDto,
    user,
  }: {
    createTenantDto: CreateTenantDto;
    user: IUser;
  }) {
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Create,
      subject(this.SubjectType, createTenantDto),
    );

    const tenant = await this.prisma.tenant.create({ data: createTenantDto });

    this.eventEmitter.emit(
      'update.index',
      new UpdateIndexEvent([tenant], this.IndexName, this.IndexConstructor),
    );

    return tenant;
  }

  async findAll({
    tenantPageOptionsDto,
    user,
  }: {
    tenantPageOptionsDto: TenantPageOptionsDto;
    user: IUser;
  }): Promise<WithCount<TenantDto>> {
    const { page, take } = tenantPageOptionsDto;

    const [results, total] = await Promise.all([
      this.prisma.tenant.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: { createdAt: 'desc' },
        where: accessibleBy(user.ability).Tenant,
      }),
      this.prisma.tenant.count({
        where: accessibleBy(user.ability).Tenant,
      }),
    ]);

    return { total, results };
  }

  async findOne({ id }: { id: string }) {
    const data = await this.prisma.tenant.findUnique({
      where: { id },
      include: {
        leases: {
          select: {
            id: true,
            start: true,
            end: true,
            unit: { select: { id: true, unitNumber: true } },
          },
        },
      },
    });
    return new TenantDto(data);
  }

  async update({
    id,
    updateTenantDto,
    user,
  }: {
    id: string;
    updateTenantDto: UpdateTenantDto;
    user: IUser;
  }) {
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Update,
      subject(this.SubjectType, updateTenantDto),
    );

    const frisked = frisk({
      user,
      SubjectType: this.SubjectType,
      instance: updateTenantDto,
    });

    const tenant = await this.prisma.tenant.update({
      where: { id },
      data: frisked,
    });

    this.eventEmitter.emit(
      'update.index',
      new UpdateIndexEvent([tenant], this.IndexName, this.IndexConstructor),
    );

    return tenant;
  }

  async remove({ id }: { id: string }) {
    const deleted = await this.prisma.tenant.delete({ where: { id } });
    return deleted.id;
  }
}
