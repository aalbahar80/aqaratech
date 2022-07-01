import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { formatDistance } from 'date-fns';
import * as R from 'remeda';
import { Action } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { Rel } from 'src/constants/rel.enum';
import { IUser } from 'src/interfaces/user.interface';
import { LeaseDto } from 'src/leases/dto/lease.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateUnitDto,
  UnitBreadcrumbsDto,
  UnitDto,
  UnitVacancy,
  UpdateUnitDto,
} from 'src/units/dto/unit.dto';
import { search } from 'src/utils/search';

@Injectable()
export class UnitsService {
  constructor(private prisma: PrismaService) {}

  async create({
    createUnitDto,
    user,
  }: {
    createUnitDto: CreateUnitDto;
    user: IUser;
  }) {
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Create,
      subject('Unit', createUnitDto),
    );

    const toCreate = R.omit(createUnitDto, ['propertyId']);
    const unit = await this.prisma.unit.create({
      data: {
        ...toCreate,
        property: { connect: { id: createUnitDto.propertyId } },
      },
    });

    return {
      ...unit,
      hateoas: {
        href: this.href(unit.id),
      },
    };
  }

  async findAll({
    unitPageOptionsDto,
    user,
  }: {
    unitPageOptionsDto: PageOptionsDto;
    user: IUser;
  }): Promise<PaginatedMetaDto<UnitDto>> {
    const { page, take, q } = unitPageOptionsDto;

    let [data, itemCount] = await Promise.all([
      this.prisma.unit.findMany({
        take,
        skip: (page - 1) * take,
        where: accessibleBy(user.ability).Unit,
        include: { leases: { select: { start: true, end: true } } },
      }),
      this.prisma.unit.count({
        where: accessibleBy(user.ability).Unit,
      }),
    ]);

    if (q) {
      data = search({
        data: data,
        q,
        keys: ['id', 'unitNumber', 'usage', 'type'],
      });
    }

    const meta = new PaginatedDto({
      itemCount,
      pageOptionsDto: unitPageOptionsDto,
    });

    const results = data.map((unit) => ({
      ...unit,
      vacancy: this.vacancy(unit.leases),
      hateoas: {
        href: this.href(unit.id),
      },
    }));

    return { meta, results };
  }

  async findOne({ id }: { id: string }): Promise<UnitDto> {
    const unit = await this.prisma.unit.findUnique({
      where: { id },
      include: {
        leases: {
          include: {
            tenant: {
              select: {
                id: true,
                fullName: true,
                shortName: true,
              },
            },
          },
        },
        property: true,
      },
    });

    const { leases, property, ...fields } = unit;
    return {
      ...fields,
      vacancy: this.vacancy(leases),
      hateoas: {
        href: this.href(unit.id),
      },
      breadcrumbs: this.breadcrumbs(unit),
    };
  }

  async update({
    id,
    updateUnitDto,
    user,
  }: {
    id: string;
    updateUnitDto: UpdateUnitDto;
    user: IUser;
  }) {
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Update,
      subject('Unit', { id, ...updateUnitDto }),
    );

    const unit = await this.prisma.unit.update({
      where: { id },
      data: updateUnitDto,
    });

    return {
      ...unit,
      hateoas: {
        href: this.href(unit.id),
      },
    };
  }

  async remove({ id }: { id: string }) {
    await this.prisma.unit.delete({ where: { id } });
    return id;
  }

  async findLeases({
    pageOptionsDto,
    user,
    id,
  }: {
    pageOptionsDto: PageOptionsDto;
    user: IUser;
    id: string;
  }): Promise<PaginatedMetaDto<LeaseDto>> {
    const { page, take } = pageOptionsDto;

    const where: Prisma.LeaseWhereInput = {
      AND: [accessibleBy(user.ability).Lease, { unitId: { equals: id } }],
    };

    let [results, itemCount] = await Promise.all([
      this.prisma.lease.findMany({ take, skip: (page - 1) * take, where }),
      this.prisma.lease.count({ where }),
    ]);

    const meta = new PaginatedDto({ itemCount, pageOptionsDto });

    return { meta, results };
  }

  // ::: HELPERS :::

  href(id: string) {
    return `/units/${id}`;
  }

  breadcrumbs(unit: {
    propertyId: string;
    property: { portfolioId: string };
  }): UnitBreadcrumbsDto {
    return {
      portfolio: {
        rel: Rel.Portfolio,
        href: `/portfolios/${unit.property.portfolioId}`,
      },
      property: {
        rel: Rel.Property,
        href: `/properties/${unit.propertyId}`,
      },
    };
  }

  vacancy(leases: { start: Date; end: Date }[]): UnitVacancy {
    const isVacant = leases.some(
      (l) => l.start <= new Date() && l.end >= new Date(),
    );
    const lease = leases[0];

    const vacancyDistance = lease?.end
      ? formatDistance(leases[0].end, new Date(), {
          addSuffix: true,
        })
      : '';

    const vacancyDate = lease?.end ?? null;

    return { isVacant, vacancyDistance, vacancyDate };
  }
}
