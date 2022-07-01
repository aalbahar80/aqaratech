import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { formatDistance } from 'date-fns';
import * as R from 'remeda';
import { Action } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { Rel } from 'src/constants/rel.enum';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUnitDto, UnitDto, UpdateUnitDto } from 'src/units/dto/unit.dto';
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
      href: this.href(unit.id),
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
        include: { leases: { select: { id: true, start: true, end: true } } },
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
      isVacant: this.isVacant(unit.leases),
      vacancyDistance: this.vacancy(unit.leases).distance,
      vacancy: this.vacancy(unit.leases).date,
      href: this.href(unit.id),
    }));

    return { meta, results };
  }

  isVacant(leases: { start: Date; end: Date }[]): boolean {
    if (leases.some((l) => l.start <= new Date() && l.end >= new Date())) {
      return false;
    }
    return true;
  }

  vacancy(leases: { start: Date; end: Date }[]): {
    distance: string;
    date: Date | null;
  } {
    const lease = leases[0];
    if (lease?.end) {
      const distance = formatDistance(leases[0].end, new Date(), {
        addSuffix: true,
      });
      return {
        distance,
        date: lease.end,
      };
    }
    return { distance: '', date: null };
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
      leases,
      isVacant: this.isVacant(leases),
      vacancyDistance: this.vacancy(leases).distance,
      vacancy: this.vacancy(leases).date,
      href: this.href(id),
      breadcrumbs: {
        portfolio: {
          rel: Rel.Portfolio,
          href: `/portfolios/${unit.property.portfolioId}`,
        },
        property: {
          rel: Rel.Property,
          href: `/properties/${unit.propertyId}`,
        },
      },
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
      href: this.href(id),
    };
  }

  async remove({ id }: { id: string }) {
    await this.prisma.unit.delete({ where: { id } });
    return id;
  }

  href(id: string) {
    return `/units/${id}`;
  }
}
