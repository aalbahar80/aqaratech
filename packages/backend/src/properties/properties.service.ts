import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Action } from 'src/casl/casl-ability.factory';
import { frisk } from 'src/casl/frisk';
import { crumbs } from 'src/common/breadcrumb-select';
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
  SubjectType = 'Property' as const;

  async create({
    createPropertyDto,
    user,
  }: {
    createPropertyDto: CreatePropertyDto;
    user: IUser;
  }) {
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Create,
      subject(this.SubjectType, createPropertyDto),
    );

    const created = await this.prisma.property.create({
      data: createPropertyDto,
    });
    return new PropertyDto(created);
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
      AND: [
        accessibleBy(user.ability, Action.Read).Property,
        ...(where ? [where] : []),
      ],
    };

    const [results, total] = await Promise.all([
      this.prisma.property.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: { createdAt: 'desc' },
        where: filter,
        include: { portfolio: crumbs.portfolio },
      }),
      this.prisma.property.count({ where: filter }),
    ]);

    return { total, results: results.map((p) => new PropertyDto(p)) };
  }

  async findOne({ id, user }: { id: string; user: IUser }) {
    const property = await this.prisma.property.findFirstOrThrow({
      where: {
        AND: [{ id }, accessibleBy(user.ability, Action.Read).Property],
      },
      include: { portfolio: crumbs.portfolio },
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
      subject(this.SubjectType, updatePropertyDto),
    );

    const frisked = frisk({
      user,
      SubjectType: this.SubjectType,
      instance: updatePropertyDto,
    });

    const updated = await this.prisma.property.update({
      where: { id },
      data: frisked,
    });
    return new PropertyDto(updated);
  }

  async remove({ id, user }: { id: string; user: IUser }) {
    await this.prisma.property.findFirstOrThrow({
      where: {
        AND: [{ id }, accessibleBy(user.ability, Action.Delete).Property],
      },
    });
    const deleted = await this.prisma.property.delete({ where: { id } });
    return deleted.id;
  }
}
