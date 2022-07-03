import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as R from 'remeda';
import { Action } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { Rel } from 'src/constants/rel.enum';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  PropertyDto,
  UpdatePropertyDto,
} from 'src/properties/dto/property.dto';
import { UnitsService } from 'src/units/units.service';
import { search } from 'src/utils/search';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService, private units: UnitsService) {}

  async create({
    createPropertyDto,
    user,
  }: {
    createPropertyDto: PropertyDto;
    user: IUser;
  }) {
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Create,
      subject('Property', createPropertyDto),
    );

    const toCreate = R.omit(createPropertyDto, ['portfolioId']);
    return this.prisma.property.create({
      data: {
        ...toCreate,
        portfolio: { connect: { id: createPropertyDto.portfolioId } },
      },
    });
  }

  async findAll({
    propertyPageOptionsDto,
    user,
  }: {
    propertyPageOptionsDto: PageOptionsDto;
    user: IUser;
  }): Promise<PaginatedMetaDto<PropertyDto>> {
    const { page, take, q } = propertyPageOptionsDto;

    let [results, itemCount] = await Promise.all([
      this.prisma.property.findMany({
        take,
        skip: (page - 1) * take,
        where: accessibleBy(user.ability).Property,
      }),
      this.prisma.property.count({
        where: accessibleBy(user.ability).Property,
      }),
    ]);

    if (q) {
      results = search({
        data: results,
        q,
        keys: ['id', 'area', 'avenue', 'paci', 'parcel', 'street'],
      });
    }

    const meta = new PaginatedDto({
      itemCount,
      pageOptionsDto: propertyPageOptionsDto,
    });

    return { meta, results };
  }

  async findOne({ id }: { id: string }) {
    const property = await this.prisma.property.findUnique({
      where: { id },
      include: {
        units: {
          select: {
            id: true,
          },
        },
      },
    });

    const units = await Promise.all(
      property.units.map((unit) => {
        return this.units.findOne({ id: unit.id });
      }),
    );

    return {
      ...property,
      breadcrumbs: {
        portfolio: {
          rel: Rel.Portfolio,
          href: `/portfolios/${property.portfolioId}`,
        },
      },
      units,
    };
  }

  update({
    id,
    updatePropertyDto,
    user,
  }: {
    id: string;
    updatePropertyDto: UpdatePropertyDto;
    user: IUser;
  }) {
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Update,
      subject('Property', { id, ...updatePropertyDto }),
    );

    return this.prisma.property.update({
      where: { id },
      data: updatePropertyDto,
    });
  }

  remove({ id }: { id: string }) {
    return this.prisma.property.delete({ where: { id } });
  }

  async findUnits({
    pageOptionsDto,
    user,
    id,
  }: {
    pageOptionsDto: PageOptionsDto;
    user: IUser;
    id: string;
  }) {
    const { page, take } = pageOptionsDto;

    const where: Prisma.UnitWhereInput = {
      AND: [accessibleBy(user.ability).Unit, { propertyId: { equals: id } }],
    };

    let [results, itemCount] = await Promise.all([
      this.prisma.unit.findMany({
        take,
        skip: (page - 1) * take,
        where,
      }),
      this.prisma.unit.count({ where }),
    ]);

    const meta = new PaginatedDto({ itemCount, pageOptionsDto });

    return { meta, results };
  }
}
