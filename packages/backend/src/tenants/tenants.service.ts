import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as R from 'remeda';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { TenantPageOptionsDto } from 'src/tenants/dto/tenant-page-options.dto';
import { TenantDto, UpdateTenantDto } from 'src/tenants/dto/tenant.dto';
import { search } from 'src/utils/search';

@Injectable()
export class TenantsService {
  constructor(
    private prisma: PrismaService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

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
    user,
  }: {
    tenantPageOptionsDto: TenantPageOptionsDto;
    user: IUser;
  }): Promise<PaginatedMetaDto<TenantDto>> {
    console.log({ user }, 'tenants.service.ts ~ 55');
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

    const meta = new PaginatedDto({
      itemCount,
      pageOptionsDto: tenantPageOptionsDto,
    });

    return { meta, results };
  }

  async findOne({ id, user }: { id: string; user: IUser }) {
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
    user: IUser;
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

  async remove({ id, user }: { id: string; user: IUser }) {
    const data = await this.prisma.tenant.findUnique({ where: { id } });

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Delete,
      subject('Tenant', data),
    );

    return this.prisma.tenant.delete({ where: { id } });
  }
}
