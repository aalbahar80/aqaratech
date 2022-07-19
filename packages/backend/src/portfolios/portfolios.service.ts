import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import * as R from 'remeda';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { IUser } from 'src/interfaces/user.interface';
import {
  CreatePortfolioDto,
  PortfolioDto,
  UpdatePortfolioDto,
} from 'src/portfolios/dto/portfolio.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PortfoliosService {
  constructor(
    private prisma: PrismaService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  create({
    createPortfolioDto,
    user,
  }: {
    createPortfolioDto: CreatePortfolioDto;
    user: IUser;
  }) {
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Create,
      subject('Portfolio', createPortfolioDto),
    );

    const toCreate = R.omit(createPortfolioDto, ['organizationId']);
    return this.prisma.portfolio.create({
      data: {
        ...toCreate,
        organization: { connect: { id: createPortfolioDto.organizationId } },
      },
    });
  }

  async findAll({
    pageOptionsDto,
    user,
  }: {
    pageOptionsDto: PageOptionsDto;
    user: IUser;
  }): Promise<WithCount<PortfolioDto>> {
    const { page, take } = pageOptionsDto;

    const ability = await this.caslAbilityFactory.defineAbility(user);
    let [results, total] = await Promise.all([
      this.prisma.portfolio.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: { createdAt: 'desc' },
        where: accessibleBy(ability).Portfolio,
      }),
      this.prisma.portfolio.count({
        where: accessibleBy(ability).Portfolio,
      }),
    ]);

    return { total, results };
  }

  async findOne({ id }: { id: string }) {
    const data = await this.prisma.portfolio.findUnique({ where: { id } });
    return data;
  }

  async update({
    id,
    updatePortfolioDto,
    user,
  }: {
    id: string;
    updatePortfolioDto: UpdatePortfolioDto;
    user: IUser;
  }) {
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Update,
      subject('Portfolio', { id, ...updatePortfolioDto }),
    );

    return this.prisma.portfolio.update({
      where: { id },
      data: updatePortfolioDto,
    });
  }

  async remove({ id }: { id: string }) {
    return this.prisma.portfolio.delete({ where: { id } });
  }
}
