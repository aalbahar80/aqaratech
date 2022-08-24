import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Action } from 'src/casl/casl-ability.factory';
import { frisk } from 'src/casl/frisk';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { UpdateIndexEvent } from 'src/events/update-index.event';
import { IUser } from 'src/interfaces/user.interface';
import { PortfolioIndexed } from 'src/portfolios/dto/portfolio-indexed';
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
    private readonly eventEmitter: EventEmitter2,
  ) {}
  SubjectType = 'Portfolio' as const;
  IndexName = 'portfolio' as const;
  IndexConstructor = PortfolioIndexed;

  async create({
    createPortfolioDto,
    user,
  }: {
    createPortfolioDto: CreatePortfolioDto;
    user: IUser;
  }) {
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Create,
      subject(this.SubjectType, createPortfolioDto),
    );

    const portfolio = this.prisma.portfolio.create({
      data: createPortfolioDto,
    });

    this.eventEmitter.emit(
      'update.index',
      new UpdateIndexEvent([portfolio], this.IndexName, this.IndexConstructor),
    );

    return portfolio;
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
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Update,
      subject(this.SubjectType, updatePortfolioDto),
    );

    const frisked = frisk({
      user,
      SubjectType: this.SubjectType,
      instance: updatePortfolioDto,
    });

    const portfolio = this.prisma.portfolio.update({
      where: { id },
      data: frisked,
    });

    this.eventEmitter.emit(
      'update.index',
      new UpdateIndexEvent([portfolio], this.IndexName, this.IndexConstructor),
    );

    return portfolio;
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
