import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as R from 'remeda';
import { Action } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreatePropertyDto,
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
    const created = await this.prisma.property.create({
      data: {
        ...toCreate,
        portfolio: { connect: { id: createPropertyDto.portfolioId } },
      },
    });
    return created.id;
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
        orderBy: { createdAt: 'desc' },
        where: filter,
        include: { portfolio: { select: { id: true, fullName: true } } },
      }),
      this.prisma.property.count({ where: filter }),
    ]);

    return { total, results: results.map((p) => new PropertyDto(p)) };
  }

  async findOne({ id }: { id: string }) {
    const property = await this.prisma.property.findUnique({
      where: { id },
      include: { portfolio: { select: { id: true, fullName: true } } },
    });

    return new PropertyDto(property);
  }

  async update({
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

    const updated = await this.prisma.property.update({
      where: { id },
      data: updatePropertyDto,
    });
    return updated.id;
  }

  async remove({ id }: { id: string }) {
    const deleted = await this.prisma.property.delete({ where: { id } });
    return deleted.id;
  }
}
