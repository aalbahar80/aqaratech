import { subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { IUser } from 'src/interfaces/user.interface';
import { LeaseDto, UpdateLeaseDto } from 'src/leases/dto/lease.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { selectForAuthz } from 'src/utils/authz-fields';
import { search } from 'src/utils/search';

@Injectable()
export class LeasesService {
  constructor(
    private prisma: PrismaService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async create({
    createLeaseDto,
    user,
  }: {
    createLeaseDto: LeaseDto;
    user: IUser;
  }) {
    // check if user has access to create lease in this organization
    const unitQ = this.prisma.unit.findUnique({
      where: { id: createLeaseDto.unitId },
      select: selectForAuthz.unit,
    });
    const tenantQ = this.prisma.tenant.findUnique({
      where: { id: createLeaseDto.tenantId },
      select: selectForAuthz.tenant,
    });
    const [tenant, unit] = await Promise.all([tenantQ, unitQ]);

    // check if tenant and unit are in the same organization
    if (unit.property.portfolio.organizationId !== tenant.organizationId) {
      // test case
      throw new BadRequestException(
        'Tenant and unit must be in the same organization',
      );
    }

    const toCreate = {
      ...createLeaseDto,
      unit,
      tenant,
    };

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Create,
      subject('Lease', toCreate),
    );

    // insert
    const input: Prisma.LeaseCreateArgs['data'] = createLeaseDto; // to make prisma call typesafe
    return this.prisma.lease.create({ data: input });
  }

  async findAll({
    leasePageOptionsDto,
    user,
  }: {
    leasePageOptionsDto: PageOptionsDto;
    user: IUser;
  }): Promise<PaginatedMetaDto<LeaseDto>> {
    const { page, take, q } = leasePageOptionsDto;

    const ability = await this.caslAbilityFactory.defineAbility(user);
    // returns a 404 whether not found or not accessible
    let [results, itemCount] = await Promise.all([
      this.prisma.lease.findMany({
        take,
        skip: (page - 1) * take,
        where: accessibleBy(ability).Lease,
      }),
      this.prisma.lease.count({
        where: accessibleBy(ability).Lease,
      }),
    ]);

    if (q) {
      results = search({
        data: results,
        q,
        keys: ['id', 'tenantId', 'unitId', 'license'],
      });
    }

    const meta = new PaginatedDto({
      itemCount,
      pageOptionsDto: leasePageOptionsDto,
    });

    return { meta, results };
  }

  async findOne({ id, user }: { id: string; user: IUser }) {
    const ability = await this.caslAbilityFactory.defineAbility(user);
    const data = await this.prisma.lease.findFirst({
      where: {
        AND: [accessibleBy(ability).Lease, { id }],
      },
    });
    return data;
  }

  async update({
    id,
    updateLeaseDto,
    user,
  }: {
    id: string;
    updateLeaseDto: UpdateLeaseDto;
    user: IUser;
  }) {
    // grab necessary data for ability check
    // alt: use findFirst with accessibleBy,
    // but we still need to check if tenant/unit are in the same organization
    const toUpdate = await this.prisma.lease.findUnique({
      where: { id },
      select: selectForAuthz.lease,
    });

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Update,
      subject('Lease', toUpdate),
    );

    // not checking if tenant and unit are in the same organization
    // since it is not possible to update tenantId or unitId
    const input: Prisma.LeaseUpdateArgs['data'] = updateLeaseDto;
    return this.prisma.lease.update({
      where: { id },
      data: input,
    });
  }

  async remove({ id, user }: { id: string; user: IUser }) {
    const data = await this.prisma.lease.findUnique({ where: { id } });

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Delete,
      subject('Lease', data),
    );

    return this.prisma.lease.delete({ where: { id } });
  }
}
