import { subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  PropertyDto,
  UpdatePropertyDto,
} from 'src/properties/dto/property.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { selectForAuthz } from 'src/utils/authz-fields';
import { search } from 'src/utils/search';

@Injectable()
export class PropertiesService {
  constructor(
    private prisma: PrismaService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async create({
    createPropertyDto,
    user,
  }: {
    createPropertyDto: PropertyDto;
    user: UserDto;
  }) {
    // check if user has access to create property
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id: createPropertyDto.portfolioId },
      select: selectForAuthz.portfolio,
    });

    const toCreate = {
      ...createPropertyDto,
      portfolio,
    };

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Create,
      subject('Property', toCreate),
    );

    const input: Prisma.PropertyCreateArgs['data'] = createPropertyDto; // to make prisma call type
    return this.prisma.property.create({ data: input });
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

    // returns a 404 whether not found or not accessible
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
    const toUpdate = await this.prisma.property.findUnique({
      where: { id },
      select: selectForAuthz.property,
    });

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Update,
      subject('Property', toUpdate),
    );

    // check permissions on new data
    if (updatePropertyDto.portfolioId) {
      const portfolio = await this.prisma.portfolio.findUnique({
        where: { id: updatePropertyDto.portfolioId },
        select: selectForAuthz.portfolio,
      });

      this.caslAbilityFactory.throwIfForbidden(
        user,
        Action.Create,
        subject('Property', {
          ...updatePropertyDto,
          portfolio,
        }),
      );
    }

    const input: Prisma.PropertyUpdateArgs['data'] = updatePropertyDto; // to make prisma call type
    return this.prisma.property.update({
      where: { id },
      data: input,
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
