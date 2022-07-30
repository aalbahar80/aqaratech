import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import * as R from 'remeda';
import { Action } from 'src/casl/casl-ability.factory';
import { WithCount } from 'src/common/dto/paginated.dto';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { TenantPageOptionsDto } from 'src/tenants/dto/tenant-page-options.dto';
import {
  CreateTenantDto,
  TenantDto,
  UpdateTenantDto,
} from 'src/tenants/dto/tenant.dto';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  async create({
    createTenantDto,
    user,
  }: {
    createTenantDto: CreateTenantDto;
    user: IUser;
  }) {
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Create,
      subject('Tenant', createTenantDto),
    );

    const toCreate = R.omit(createTenantDto, ['organizationId']);
    const created = await this.prisma.tenant.create({
      data: {
        ...toCreate,
        organization: { connect: { id: createTenantDto.organizationId } },
      },
    });
    return created.id;
  }

  async findAll({
    tenantPageOptionsDto,
    user,
  }: {
    tenantPageOptionsDto: TenantPageOptionsDto;
    user: IUser;
  }): Promise<WithCount<TenantDto>> {
    const { page, take } = tenantPageOptionsDto;

    let [results, total] = await Promise.all([
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

  findOne({ id }: { id: string }) {
    return this.prisma.tenant.findUnique({
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
      subject('Tenant', { id, ...updateTenantDto }),
    );

    const updated = await this.prisma.tenant.update({
      where: { id },
      data: updateTenantDto,
    });
    return updated.id;
  }

  async remove({ id }: { id: string }) {
    const deleted = await this.prisma.tenant.delete({ where: { id } });
    return deleted.id;
  }

  getName(tenant: TenantDto) {
    return tenant.label || tenant.fullName;
  }
}
