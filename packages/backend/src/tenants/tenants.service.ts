import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import * as R from 'remeda';
import { Action } from 'src/casl/casl-ability.factory';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { TenantPageOptionsDto } from 'src/tenants/dto/tenant-page-options.dto';
import { TenantDto, UpdateTenantDto } from 'src/tenants/dto/tenant.dto';
import { search } from 'src/utils/search';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  async create({
    createTenantDto,
    user,
  }: {
    createTenantDto: TenantDto;
    user: IUser;
  }) {
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Create,
      subject('Tenant', createTenantDto),
    );

    const toCreate = R.omit(createTenantDto, ['organizationId']);
    return this.prisma.tenant.create({
      data: {
        ...toCreate,
        organization: { connect: { id: createTenantDto.organizationId } },
      },
    });
  }

  async findAll({
    tenantPageOptionsDto,
    user,
  }: {
    tenantPageOptionsDto: TenantPageOptionsDto;
    user: IUser;
  }): Promise<PaginatedMetaDto<TenantDto>> {
    const { page, take, q } = tenantPageOptionsDto;

    let [results, itemCount] = await Promise.all([
      this.prisma.tenant.findMany({
        take,
        skip: (page - 1) * take,
        where: accessibleBy(user.ability).Tenant,
      }),
      this.prisma.tenant.count({
        where: accessibleBy(user.ability).Tenant,
      }),
    ]);

    if (q) {
      results = search({
        data: results,
        q,
        keys: [
          'fullName',
          'shortName',
          'civilid',
          'dob',
          'phone',
          'email',
          'passportNum',
          'nationality',
          'residencyNum',
          'residencyEnd',
        ],
      });
    }

    const pagination = new PaginatedDto({
      itemCount,
      pageOptionsDto: tenantPageOptionsDto,
      pageSize: results.length,
    });

    return { pagination, results };
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

  update({
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

    return this.prisma.tenant.update({
      where: { id },
      data: updateTenantDto,
    });
  }

  remove({ id }: { id: string }) {
    return this.prisma.tenant.delete({ where: { id } });
  }

  getName(tenant: TenantDto) {
    return tenant.shortName || tenant.fullName;
  }
}
