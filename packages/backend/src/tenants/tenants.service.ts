import { subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
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

  create({
    createTenantDto,
    user,
    orgId,
  }: {
    createTenantDto: TenantDto;
    user: UserDto;
    orgId: string;
  }) {
    const data = { ...createTenantDto, organizationId: orgId };

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Create,
      subject('Tenant', data),
    );

    return this.prisma.tenant.create({ data });
  }

  async findAll({
    tenantPageOptionsDto,
    user,
  }: {
    tenantPageOptionsDto: TenantPageOptionsDto;
    user: UserDto;
  }): Promise<PaginatedMetaDto<TenantDto>> {
    const { page, take, q } = tenantPageOptionsDto;

    const ability = this.caslAbilityFactory.defineAbility(user);
    // TODO test this
    // https://casl.js.org/v5/en/package/casl-prisma#finding-accessible-records
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
    const ability = this.caslAbilityFactory.defineAbility(user);
    const tenant = await this.prisma.tenant.findFirst({
      where: {
        AND: [accessibleBy(ability).Tenant, { id }],
      },
    });
    return tenant;
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
    const tenant = await this.prisma.tenant.findUnique({ where: { id } });

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Update,
      subject('Tenant', tenant),
    );

    return this.prisma.tenant.update({
      where: { id },
      data: updateTenantDto,
    });
  }

  async remove({ id, user }: { id: string; user: UserDto }) {
    const tenant = await this.prisma.tenant.findUnique({ where: { id } });

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Delete,
      subject('Tenant', tenant),
    );

    return this.prisma.tenant.delete({ where: { id } });
  }
}
