import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  create(createTenantDto: CreateTenantDto) {
    return this.prisma.tenant.create({
      data: { ...createTenantDto, organizationId: 'implement' },
    });
  }

  async findAll(
    tenantPageOptionsDto: TenantPageOptionsDto,
    user: UserDto,
  ): Promise<PaginatedMetaDto<TenantDto>> {
    const { page, take } = tenantPageOptionsDto;

    // get req.user from request
    const ability = this.caslAbilityFactory.defineAbility(user);
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

  async findOne(id: string, user: UserDto) {
    const tenant = await this.prisma.tenant.findUnique({ where: { id } });
    const ability = this.caslAbilityFactory.defineAbility(user);
    if (ability.can(Action.Read, subject('Tenant', tenant))) {
      return tenant;
    }
    throw new UnauthorizedException();
  }

  update(id: string, updateTenantDto: UpdateTenantDto) {
    return this.prisma.tenant.update({
      where: { id },
      data: updateTenantDto,
    });
  }

  remove(id: string) {
    return this.prisma.tenant.delete({ where: { id } });
  }
}
