import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import * as R from 'remeda';
import { Action } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { UnitDto, UpdateUnitDto } from 'src/units/dto/unit.dto';
import { search } from 'src/utils/search';

@Injectable()
export class UnitsService {
  constructor(private prisma: PrismaService) {}

  async create({
    createUnitDto,
    user,
  }: {
    createUnitDto: UnitDto;
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
  }): Promise<PaginatedMetaDto<UnitDto>> {
    const { page, take, q } = unitPageOptionsDto;

    let [results, itemCount] = await Promise.all([
      this.prisma.unit.findMany({
        take,
        skip: (page - 1) * take,
        where: accessibleBy(user.ability).Unit,
      }),
      this.prisma.unit.count({
        where: accessibleBy(user.ability).Unit,
      }),
    ]);

    if (q) {
      results = search({
        data: results,
        q,
        keys: ['id', 'unitNumber', 'usage', 'type'],
      });
    }

    const meta = new PaginatedDto({
      itemCount,
      pageOptionsDto: unitPageOptionsDto,
    });

    return { meta, results };
  }

  findOne({ id }: { id: string }) {
    return this.prisma.unit.findUnique({ where: { id } });
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
