import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Action } from 'src/casl/casl-ability.factory';
import { frisk } from 'src/casl/frisk';
import { WithCount } from 'src/common/dto/paginated.dto';
import { TenantIndexEvent } from 'src/events/tenant-input.event';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchService } from 'src/search/search.service';
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
    private readonly searchService: SearchService,
  ) {}
  SubjectType = 'Tenant' as const;
  indexName = 'tenants' as const;

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

    this.eventEmitter.emit('tenant.index', new TenantIndexEvent([tenant]));

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

    this.eventEmitter.emit('tenant.index', new TenantIndexEvent([tenant]));

    return tenant;
  }

  async remove({ id }: { id: string }) {
    const deleted = await this.prisma.tenant.delete({ where: { id } });
    return deleted.id;
  }

  @OnEvent('tenant.index')
  async updateSearchIndex(payload: TenantIndexEvent) {
    const tenants = payload.tenants.map((tenant) => ({
      id: tenant.id,
      fullName: tenant.fullName,
      label: tenant.label,
      phone: tenant.phone,
      passportNum: tenant.passportNum,
      civilid: tenant.civilid,
      residencyNum: tenant.residencyNum,
      title: tenant.fullName,
      // TODO handle emails/roles
      // email: tenant.roles.map((role) => role.user.email),
      organizationId: tenant.organizationId,
    }));
    const index = await this.searchService.client.getIndex(this.indexName);
    // TODO dry up with search service
    return index.addDocuments(tenants);
  }
}
