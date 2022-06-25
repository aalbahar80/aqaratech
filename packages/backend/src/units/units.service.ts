import { subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UnitDto, UpdateUnitDto } from 'src/units/dto/unit.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { selectForAuthz } from 'src/utils/authz-fields';
import { search } from 'src/utils/search';

@Injectable()
export class UnitsService {
  constructor(
    private prisma: PrismaService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async create({
    createUnitDto,
    user,
  }: {
    createUnitDto: UnitDto;
    user: UserDto;
  }) {
    // check if user has access to create unit in this organization
    // alt: use prismawhere to filter if user has access to create unit in this organization
    const property = await this.prisma.property.findUnique({
      where: { id: createUnitDto.propertyId },
      select: selectForAuthz.property,
    });

    const toCreate = {
      ...createUnitDto,
      property,
    };

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Create,
      subject('Unit', toCreate),
    );

    // insert
    const input: Prisma.UnitCreateArgs['data'] = createUnitDto; // to make prisma call typesafe
    return this.prisma.unit.create({ data: input });
  }

  async findAll({
    unitPageOptionsDto,
    user,
  }: {
    unitPageOptionsDto: PageOptionsDto;
    user: UserDto;
  }): Promise<PaginatedMetaDto<UnitDto>> {
    const { page, take, q } = unitPageOptionsDto;

    const ability = await this.caslAbilityFactory.defineAbility(user);
    // TODO test this
    // https://casl.js.org/v5/en/package/casl-prisma#finding-accessible-records
    // returns a 404 whether not found or not accessible
    let [results, itemCount] = await Promise.all([
      this.prisma.unit.findMany({
        take,
        skip: (page - 1) * take,
        where: accessibleBy(ability).Unit,
      }),
      this.prisma.unit.count({
        where: accessibleBy(ability).Unit,
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

  async findOne({ id, user }: { id: string; user: UserDto }) {
    const ability = await this.caslAbilityFactory.defineAbility(user);
    const data = await this.prisma.unit.findFirst({
      where: {
        AND: [accessibleBy(ability).Unit, { id }],
      },
    });
    return data;
  }

  async update({
    id,
    updateUnitDto,
    user,
  }: {
    id: string;
    updateUnitDto: UpdateUnitDto;
    user: UserDto;
  }) {
    // grab necessary data for ability check
    const toUpdate = await this.prisma.unit.findUnique({
      where: { id },
      select: selectForAuthz.unit,
    });

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Update,
      subject('Unit', toUpdate),
    );

    // no need to check for permissions here, since propertyId is forbidden in this endpoint
    const input: Prisma.UnitUpdateArgs['data'] = updateUnitDto;
    return this.prisma.unit.update({
      where: { id },
      data: input,
    });
  }

  async remove({ id, user }: { id: string; user: UserDto }) {
    const data = await this.prisma.unit.findUnique({ where: { id } });

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Delete,
      subject('Unit', data),
    );

    return this.prisma.unit.delete({ where: { id } });
  }
}
