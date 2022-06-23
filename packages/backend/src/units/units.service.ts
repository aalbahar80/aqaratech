import { subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UnitDto, UpdateUnitDto } from 'src/units/dto/unit.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { search } from 'src/utils/search';

@Injectable()
export class UnitsService {
  constructor(
    private prisma: PrismaService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  create({
    createUnitDto,
    user,
    orgId,
  }: {
    createUnitDto: UnitDto;
    user: UserDto;
    orgId: string;
  }) {
    const data = { ...createUnitDto, organizationId: orgId };

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Create,
      subject('Unit', data),
    );

    return this.prisma.unit.create({ data });
  }

  async findAll({
    unitPageOptionsDto,
    user,
  }: {
    unitPageOptionsDto: PageOptionsDto;
    user: UserDto;
  }): Promise<PaginatedMetaDto<UnitDto>> {
    const { page, take, q } = unitPageOptionsDto;

    const ability = this.caslAbilityFactory.defineAbility(user);
    // TODO test this
    // https://casl.js.org/v5/en/package/casl-prisma#finding-accessible-records
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
    const ability = this.caslAbilityFactory.defineAbility(user);
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
    const data = await this.prisma.unit.findUnique({ where: { id } });

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Update,
      subject('Unit', data),
    );

    return this.prisma.unit.update({
      where: { id },
      data: updateUnitDto,
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
