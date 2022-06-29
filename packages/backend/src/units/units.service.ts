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
import {
  CreateUnitDto,
  UnitOneDto,
  UnitVacancyDto,
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
    return this.prisma.unit.create({
      data: {
        ...toCreate,
        property: { connect: { id: createUnitDto.propertyId } },
      },
    });
  }

  async findAll({
    unitPageOptionsDto,
    user,
  }: {
    unitPageOptionsDto: PageOptionsDto;
    user: IUser;
  }): Promise<PaginatedMetaDto<UnitVacancyDto>> {
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
      isVacant: this.isVacant(unit.leases),
      vacancyDistance: this.vacancy(unit.leases).distance,
      vacancy: this.vacancy(unit.leases).date,
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

  async findOne({ id }: { id: string }): Promise<UnitOneDto> {
    const unit = await this.prisma.unit.findUnique({
      where: { id },
      include: {
        leases: {
          include: {
            tenant: {
              select: {
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

  update({
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

    return this.prisma.unit.update({
      where: { id },
      data: updateUnitDto,
    });
  }

  remove({ id }: { id: string }) {
    return this.prisma.unit.delete({ where: { id } });
  }
}
