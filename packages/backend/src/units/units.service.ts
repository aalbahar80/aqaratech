import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as R from 'remeda';
import { Action } from 'src/casl/casl-ability.factory';
import { crumbs } from 'src/common/breadcrumb-select';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUnitDto, UnitDto, UpdateUnitDto } from 'src/units/dto/unit.dto';

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
    const created = await this.prisma.unit.create({
      data: {
        ...toCreate,
        property: { connect: { id: createUnitDto.propertyId } },
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
    where?: Prisma.UnitWhereInput;
  }): Promise<WithCount<UnitDto>> {
    const { page, take } = pageOptionsDto;

    const filter: Prisma.UnitWhereInput = {
      AND: [
        accessibleBy(user.ability, Action.Read).Unit,
        ...(where ? [where] : []),
      ],
    };

    const [data, total] = await Promise.all([
      this.prisma.unit.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: { unitNumber: 'asc' },
        where: filter,
        include: {
          // TODO sort it. it affects vacancy calculation
          leases: { select: { start: true, end: true } },
          property: crumbs.property,
        },
      }),
      this.prisma.unit.count({ where: filter }),
    ]);

    return { total, results: data.map((u) => new UnitDto(u)) };
  }

  async findOne({ id }: { id: string }): Promise<UnitDto> {
    const data = await this.prisma.unit.findUnique({
      where: { id },
      include: {
        // TODO sort it. it affects vacancy calculation
        leases: { select: { start: true, end: true } },
        property: crumbs.property,
      },
    });

    return new UnitDto(data);
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

    const updated = await this.prisma.unit.update({
      where: { id },
      data: updateUnitDto,
    });
    return updated.id;
  }

  async remove({ id }: { id: string }) {
    await this.prisma.unit.delete({ where: { id } });
    return id;
  }
}
