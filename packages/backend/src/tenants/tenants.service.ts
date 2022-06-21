import { ForbiddenException, Injectable } from '@nestjs/common';
import { TenantPageOptionsDto } from 'src/tenants/dto/tenant-page-options.dto';
import { TenantDto } from 'src/tenants/dto/tenant.dto';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

import { subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class TenantsService {
  constructor(
    private prisma: PrismaService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  create({
    createTenantDto,
    user,
  }: {
    createTenantDto: CreateTenantDto;
    user: UserDto;
  }) {
    const ability = this.caslAbilityFactory.defineAbility(user);
    if (ability.can(Action.Create, subject('Tenant', createTenantDto))) {
      return this.prisma.tenant.create({ data: createTenantDto });
    } else {
      throw new ForbiddenException();
    }
  }

  async findAll({
    tenantPageOptionsDto,
    user,
  }: {
    tenantPageOptionsDto: TenantPageOptionsDto;
    user: UserDto;
  }): Promise<PaginatedMetaDto<TenantDto>> {
    const { page, take } = tenantPageOptionsDto;

    const ability = this.caslAbilityFactory.defineAbility(user);
    // TODO test this
    // https://casl.js.org/v5/en/package/casl-prisma#finding-accessible-records
    const [results, itemCount] = await Promise.all([
      this.prisma.tenant.findMany({
        take,
        skip: (page - 1) * take,
        where: accessibleBy(ability).Tenant,
      }),
      this.prisma.tenant.count({
        where: accessibleBy(ability).Tenant,
      }),
    ]);

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

    const ability = this.caslAbilityFactory.defineAbility(user);
    if (ability.can(Action.Update, subject('Tenant', tenant))) {
      return this.prisma.tenant.update({
        where: { id },
        data: updateTenantDto,
      });
    } else {
      throw new ForbiddenException();
    }
  }

  async remove({ id, user }: { id: string; user: UserDto }) {
    const tenant = await this.prisma.tenant.findUnique({ where: { id } });
    const ability = this.caslAbilityFactory.defineAbility(user);

    if (ability.can(Action.Delete, subject('Tenant', tenant))) {
      return this.prisma.tenant.delete({ where: { id } });
    } else {
      throw new ForbiddenException();
    }
  }
}
