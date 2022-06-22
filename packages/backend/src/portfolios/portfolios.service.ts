import { subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/users/dto/user.dto';
import { search } from 'src/utils/search';

import { CreatePortfolioDto } from 'src/portfolios/dto/create-portfolio.dto';
import { PortfolioDto } from 'src/portfolios/dto/portfolio.dto';
import { UpdatePortfolioDto } from 'src/portfolios/dto/update-portfolio.dto';

@Injectable()
export class PortfoliosService {
  constructor(
    private prisma: PrismaService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  create({
    createPortfolioDto,
    user,
    orgId,
  }: {
    createPortfolioDto: CreatePortfolioDto;
    user: UserDto;
    orgId: string;
  }) {
    const data = { ...createPortfolioDto, organizationId: orgId };

    const ability = this.caslAbilityFactory.defineAbility(user);
    if (ability.can(Action.Create, subject('Portfolio', data))) {
      return this.prisma.portfolio.create({ data });
    } else {
      throw new ForbiddenException();
    }
  }

  async findAll({
    portfolioPageOptionsDto,
    user,
  }: {
    portfolioPageOptionsDto: PageOptionsDto;
    user: UserDto;
  }): Promise<PaginatedMetaDto<PortfolioDto>> {
    const { page, take, q } = portfolioPageOptionsDto;

    const ability = this.caslAbilityFactory.defineAbility(user);
    // TODO test this
    // https://casl.js.org/v5/en/package/casl-prisma#finding-accessible-records
    let [results, itemCount] = await Promise.all([
      this.prisma.portfolio.findMany({
        take,
        skip: (page - 1) * take,
        where: accessibleBy(ability).Portfolio,
      }),
      this.prisma.portfolio.count({
        where: accessibleBy(ability).Portfolio,
      }),
    ]);

    if (q) {
      results = search({
        data: results,
        q,
        keys: ['fullName', 'shortName', 'civilid', 'dob', 'phone', 'email'],
      });
    }

    const meta = new PaginatedDto({
      itemCount,
      pageOptionsDto: portfolioPageOptionsDto,
    });

    return { meta, results };
  }

  async findOne({ id, user }: { id: string; user: UserDto }) {
    const ability = this.caslAbilityFactory.defineAbility(user);
    const portfolio = await this.prisma.portfolio.findFirst({
      where: {
        AND: [accessibleBy(ability).Portfolio, { id }],
      },
    });
    return portfolio;
  }

  async update({
    id,
    updatePortfolioDto,
    user,
  }: {
    id: string;
    updatePortfolioDto: UpdatePortfolioDto;
    user: UserDto;
  }) {
    const portfolio = await this.prisma.portfolio.findUnique({ where: { id } });

    const ability = this.caslAbilityFactory.defineAbility(user);
    if (ability.can(Action.Update, subject('Portfolio', portfolio))) {
      return this.prisma.portfolio.update({
        where: { id },
        data: updatePortfolioDto,
      });
    } else {
      throw new ForbiddenException();
    }
  }

  async remove({ id, user }: { id: string; user: UserDto }) {
    const portfolio = await this.prisma.portfolio.findUnique({ where: { id } });

    const ability = this.caslAbilityFactory.defineAbility(user);
    if (ability.can(Action.Delete, subject('Portfolio', portfolio))) {
      return this.prisma.portfolio.delete({ where: { id } });
    } else {
      throw new ForbiddenException();
    }
  }
}
