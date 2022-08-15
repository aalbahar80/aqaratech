import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import * as R from 'remeda';
import { Action } from 'src/casl/casl-ability.factory';
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
  constructor(private prisma: PrismaService) {}

  async create({
    createPortfolioDto,
    user,
  }: {
    createPortfolioDto: CreatePortfolioDto;
    user: IUser;
  }) {
    await this.prisma.organization.findFirstOrThrow({
      where: {
        AND: [
          { id: createPortfolioDto.organizationId },
          accessibleBy(user.ability, Action.Update).Organization,
        ],
      },
    });

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

    const [results, total] = await Promise.all([
      this.prisma.portfolio.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: { createdAt: 'desc' },
        where: accessibleBy(user.ability, Action.Read).Portfolio,
      }),
      this.prisma.portfolio.count({
        where: accessibleBy(user.ability, Action.Read).Portfolio,
      }),
    ]);

    return { total, results };
  }

  async findOne({ id, user }: { id: string; user: IUser }) {
    const data = await this.prisma.portfolio.findFirstOrThrow({
      where: {
        AND: [{ id }, accessibleBy(user.ability, Action.Read).Portfolio],
      },
    });
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
    const fields = R.keys(instanceToPlain(updatePortfolioDto));

    // check if user has permission to update fields
    fields.forEach((field) => {
      ForbiddenError.from(user.ability)
        .setMessage(`You are not allowed to update ${field}`)
        .throwUnlessCan(Action.Update, 'Portfolio', field);
    });

    // check if user has permission to update specific instance
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Update,
      // TODO add organizationId to portfolioDto
      subject('Portfolio', updatePortfolioDto),
    );

    return this.prisma.portfolio.update({
      where: { id },
      data: updatePortfolioDto,
    });
  }

  async remove({ id, user }: { id: string; user: IUser }) {
    await this.prisma.portfolio.findFirstOrThrow({
      where: {
        AND: [{ id }, accessibleBy(user.ability, Action.Delete).Portfolio],
      },
    });

    return this.prisma.portfolio.delete({ where: { id } });
  }
}
