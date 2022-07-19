import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as R from 'remeda';
import { Action } from 'src/casl/casl-ability.factory';
import {
  BreadcrumbDto,
  PortfolioLabelParams,
  PropertyLabelParams,
} from 'src/common/dto/breadcrumb.dto';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { Rel } from 'src/constants/rel.enum';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreatePropertyDto,
  PropertyBreadcrumbsDto,
  PropertyDto,
  UpdatePropertyDto,
} from 'src/properties/dto/property.dto';

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
  }): Promise<WithCount<PropertyDto>> {
    const { page, take } = pageOptionsDto;

    const filter: Prisma.PropertyWhereInput = {
      AND: [accessibleBy(user.ability).Property, ...(where ? [where] : [])],
    };

    let [results, total] = await Promise.all([
      this.prisma.property.findMany({
        take,
        skip: (page - 1) * take,
        where: filter,
        include: { portfolio: true },
      }),
      this.prisma.property.count({ where: filter }),
    ]);

    const properties = results.map((property) => {
      const breadcrumbs = this.getBreadcrumbs(property);
      const { portfolio, ...toReturn } = property;
      return { ...toReturn, breadcrumbs };
    });

    return { total, results: properties };
  }

  async findOne({ id }: { id: string }) {
    const property = await this.prisma.property.findUnique({
      where: { id },
      // TODO only select the fields we need for breadcrumbs
      include: { portfolio: true },
    });
    const breadcrumbs = this.getBreadcrumbs(property);

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

  getBreadcrumbs(
    property: PropertyLabelParams & { portfolio: PortfolioLabelParams },
  ): PropertyBreadcrumbsDto {
    return {
      portfolio: new BreadcrumbDto({
        rel: Rel.Portfolio,
        ...property.portfolio,
      }),
      property: new BreadcrumbDto({ rel: Rel.Property, ...property }),
    };
  }
}
