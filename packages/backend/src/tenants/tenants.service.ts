import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as R from 'remeda';
import {
  Action,
  AppAbility,
  CaslAbilityFactory,
} from 'src/casl/casl-ability.factory';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TenantPageOptionsDto } from 'src/tenants/dto/tenant-page-options.dto';
import { TenantDto, UpdateTenantDto } from 'src/tenants/dto/tenant.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { search } from 'src/utils/search';

@Injectable()
export class TenantsService {
  constructor(
    private prisma: PrismaService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async create({
    createTenantDto,
    ability,
  }: {
    createTenantDto: TenantDto;
    ability: AppAbility;
  }) {
    ForbiddenError.from(ability).throwUnlessCan(
      Action.Create,
      subject('Tenant', createTenantDto),
    );

    // use Prisma's `connect` to enforce referential integrity
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
    ability,
  }: {
    tenantPageOptionsDto: TenantPageOptionsDto;
    ability: AppAbility;
  }): Promise<PaginatedMetaDto<TenantDto>> {
    const { page, take, q } = tenantPageOptionsDto;

    let [results, itemCount] = await Promise.all([
      this.prisma.tenant.findMany({
        take,
        skip: (page - 1) * take,
        where: accessibleBy(ability).Tenant,
      }),
      this.prisma.tenant.count({
        where: accessibleBy(ability).Tenant,
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

    const meta = new PaginatedDto({
      itemCount,
      pageOptionsDto: tenantPageOptionsDto,
    });

    return { meta, results };
  }

  async findOne({ id, user }: { id: string; user: UserDto }) {
    const ability = await this.caslAbilityFactory.defineAbility(user);
    const data = await this.prisma.tenant.findFirst({
      where: {
        AND: [accessibleBy(ability).Tenant, { id }],
      },
    });
    return data;
  }

  async update({
    id,
    updateTenantDto,
    user,
  }: {
    id: string;
    updateTenantDto: UpdateTenantDto;
    user: UserDto;
  }) {
    const toUpdate = await this.prisma.tenant.findUnique({ where: { id } });

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Update,
      subject('Tenant', toUpdate),
    );

    const input: Prisma.TenantUpdateArgs['data'] = updateTenantDto;
    return this.prisma.tenant.update({
      where: { id },
      data: input,
    });
  }

  async remove({ id, user }: { id: string; user: UserDto }) {
    const data = await this.prisma.tenant.findUnique({ where: { id } });

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Delete,
      subject('Tenant', data),
    );

    return this.prisma.tenant.delete({ where: { id } });
  }
}
