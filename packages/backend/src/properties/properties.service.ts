import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as R from 'remeda';
import { Action } from 'src/casl/casl-ability.factory';
import { BreadcrumbDto } from 'src/common/dto/breadcrumb.dto';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { Rel } from 'src/constants/rel.enum';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreatePropertyDto,
  PropertyBreadcrumbsDto,
  PropertyDto,
  UpdatePropertyDto,
} from 'src/properties/dto/property.dto';
import { search } from 'src/utils/search';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async create({
    createPropertyDto,
    user,
  }: {
    createPropertyDto: CreatePropertyDto;
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
    pageOptionsDto,
    user,
    where,
  }: {
    pageOptionsDto: PageOptionsDto;
    user: IUser;
    where?: Prisma.PropertyWhereInput;
  }): Promise<PaginatedMetaDto<PropertyDto>> {
    const { page, take, q } = pageOptionsDto;

    const filter: Prisma.PropertyWhereInput = {
      AND: [accessibleBy(user.ability).Property, ...(where ? [where] : [])],
    };

    let [results, itemCount] = await Promise.all([
      this.prisma.property.findMany({
        take,
        skip: (page - 1) * take,
        where: filter,
      }),
      this.prisma.property.count({ where: filter }),
    ]);

    if (q) {
      results = search({
        data: results,
        q,
        keys: ['id', 'area', 'avenue', 'paci', 'parcel', 'street'],
      });
    }

    const pagination = new PaginatedDto({
      itemCount,
      pageOptionsDto: pageOptionsDto,
      pageSize: results.length,
    });

    return { pagination, results };
  }

  async findOne({ id }: { id: string }) {
    const [property, breadcrumbs] = await Promise.all([
      this.prisma.property.findUnique({ where: { id } }),
      this.getBreadcrumbs(id),
    ]);

    return { ...property, breadcrumbs };
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

  // ::: HELPERS :::

  async getBreadcrumbs(propertyId: string): Promise<PropertyBreadcrumbsDto> {
    const portfolio = await this.prisma.portfolio.findFirst({
      where: { properties: { some: { id: propertyId } } },
    });
    return {
      portfolio: new BreadcrumbDto({ rel: Rel.Portfolio, ...portfolio }),
    };
  }
}
