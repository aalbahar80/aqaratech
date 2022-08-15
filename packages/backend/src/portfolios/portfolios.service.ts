import { permittedFieldsOf } from '@casl/ability/extra';
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
  SubjectType = 'Portfolio' as const;

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
    // canUpdateFields({
    //   user,
    //   subjectType: this.SubjectType,
    //   instance: updatePortfolioDto,
    // });

    /**
     * Strip out fields that are not permitted to be updated by the user.
     */
    const fields = R.keys(instanceToPlain(updatePortfolioDto));
    const permittedFields = permittedFieldsOf(
      user.ability,
      Action.Update,
      this.SubjectType,
      { fieldsFrom: (rule) => rule.fields || fields },
    );
    // @ts-ignore
    const toUpdate = R.pick(updatePortfolioDto, permittedFields);

    console.log({ toUpdate }, 'portfolios.service.ts ~ 109');
    console.log({ fields }, 'portfolios.service.ts ~ 104');
    console.log({ permittedFields }, 'portfolios.service.ts ~ 105');

    // // check if user has permission to update specific instance
    // ForbiddenError.from(user.ability).throwUnlessCan(
    //   Action.Update,
    //   // TODO add organizationId to portfolioDto
    //   subject(this.SubjectType, updatePortfolioDto),
    // );

    // ForbiddenError.from(user.ability).throwUnlessCan(
    //   Action.Update,
    //   subject(this.SubjectType, updatePortfolioDto),
    // );

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
