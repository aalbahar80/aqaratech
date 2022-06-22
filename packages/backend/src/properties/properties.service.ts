import { subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  PropertyDto,
  UpdatePropertyDto,
} from 'src/properties/dto/property.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { search } from 'src/utils/search';

@Injectable()
export class PropertiesService {
  constructor(
    private prisma: PrismaService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  create({
    createPropertyDto,
    user,
    orgId,
  }: {
    createPropertyDto: PropertyDto;
    user: UserDto;
    orgId: string;
  }) {
    const data = { ...createPropertyDto, organizationId: orgId };

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Create,
      subject('Property', data),
    );

    return this.prisma.property.create({ data });
  }

  async findAll({
    propertyPageOptionsDto,
    user,
  }: {
    propertyPageOptionsDto: PageOptionsDto;
    user: UserDto;
  }): Promise<PaginatedMetaDto<PropertyDto>> {
    const { page, take, q } = propertyPageOptionsDto;

    const ability = this.caslAbilityFactory.defineAbility(user);
    // TODO test this
    // https://casl.js.org/v5/en/package/casl-prisma#finding-accessible-records
    let [results, itemCount] = await Promise.all([
      this.prisma.property.findMany({
        take,
        skip: (page - 1) * take,
        where: accessibleBy(ability).Property,
      }),
      this.prisma.property.count({
        where: accessibleBy(ability).Property,
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

  async findOne({ id, user }: { id: string; user: UserDto }) {
    const ability = this.caslAbilityFactory.defineAbility(user);
    const data = await this.prisma.property.findFirst({
      where: {
        AND: [accessibleBy(ability).Property, { id }],
      },
    });
    return data;
  }

  async update({
    id,
    updatePropertyDto,
    user,
  }: {
    id: string;
    updatePropertyDto: UpdatePropertyDto;
    user: UserDto;
  }) {
    const data = await this.prisma.property.findUnique({ where: { id } });

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Update,
      subject('Property', data),
    );

    return this.prisma.property.update({
      where: { id },
      data: updatePropertyDto,
    });
  }

  async remove({ id, user }: { id: string; user: UserDto }) {
    const data = await this.prisma.property.findUnique({ where: { id } });

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Delete,
      subject('Property', data),
    );

    return this.prisma.property.delete({ where: { id } });
  }
}
