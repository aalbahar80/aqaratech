import { subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { ExpenseDto, UpdateExpenseDto } from 'src/expenses/dto/expense.dto';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { selectForAuthz } from 'src/utils/authz-fields';
import { search } from 'src/utils/search';

@Injectable()
export class ExpensesService {
  constructor(
    private prisma: PrismaService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async create({
    createExpenseDto,
    user,
  }: {
    createExpenseDto: ExpenseDto;
    user: IUser;
  }) {
    // check if user has access to create expense for property/unit/portfolio
    const ability = await this.caslAbilityFactory.defineAbility(user);
    const { unitId, propertyId, portfolioId } = createExpenseDto;

    let toCreate: ExpenseDto & Record<string, any> = { ...createExpenseDto };

    // TODO validate that only one of unitId, propertyId, portfolioId is set
    if (unitId) {
      const unit = await this.prisma.unit.findFirst({
        where: { AND: [accessibleBy(ability).Unit, { id: unitId }] },
        select: selectForAuthz.unit,
      });
      toCreate.unit = unit;
    } else if (propertyId) {
      const property = await this.prisma.property.findFirst({
        where: { AND: [accessibleBy(ability).Property, { id: propertyId }] },
        select: selectForAuthz.property,
      });
      toCreate.property = property;
    } else if (portfolioId) {
      const portfolio = await this.prisma.portfolio.findFirst({
        where: { AND: [accessibleBy(ability).Portfolio, { id: portfolioId }] },
        select: selectForAuthz.portfolio,
      });
      toCreate.portfolio = portfolio;
    }

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Create,
      subject('Expense', toCreate),
    );

    // insert
    const input: Prisma.ExpenseCreateArgs['data'] = createExpenseDto; // to make prisma call typesafe
    return this.prisma.expense.create({ data: input });
  }

  async findAll({
    expensePageOptionsDto,
    user,
  }: {
    expensePageOptionsDto: PageOptionsDto;
    user: IUser;
  }): Promise<PaginatedMetaDto<ExpenseDto>> {
    const { page, take, q } = expensePageOptionsDto;

    const ability = await this.caslAbilityFactory.defineAbility(user);
    // returns a 404 whether not found or not accessible
    let [results, itemCount] = await Promise.all([
      this.prisma.expense.findMany({
        take,
        skip: (page - 1) * take,
        where: accessibleBy(ability).Expense,
      }),
      this.prisma.expense.count({
        where: accessibleBy(ability).Expense,
      }),
    ]);

    if (q) {
      results = search({ data: results, q, keys: ['id', 'memo', 'amount'] });
    }

    const meta = new PaginatedDto({
      itemCount,
      pageOptionsDto: expensePageOptionsDto,
    });

    return { meta, results };
  }

  async findOne({ id, user }: { id: string; user: IUser }) {
    const ability = await this.caslAbilityFactory.defineAbility(user);
    const data = await this.prisma.expense.findFirst({
      where: {
        AND: [accessibleBy(ability).Expense, { id }],
      },
    });
    return data;
  }

  async update({
    id,
    updateExpenseDto,
    user,
  }: {
    id: string;
    updateExpenseDto: UpdateExpenseDto;
    user: IUser;
  }) {
    // check if user has access to update expense
    const ability = await this.caslAbilityFactory.defineAbility(user);
    await this.prisma.expense.findFirst({
      where: { AND: [accessibleBy(ability, Action.Update).Expense, { id }] },
    });

    const { unitId, propertyId, portfolioId } = updateExpenseDto;

    let toUpdate: UpdateExpenseDto & Record<string, any> = {
      ...updateExpenseDto,
    };

    // TODO validate that only one of unitId, propertyId, portfolioId is set
    // TODO dry with /create
    // check if user has access to new unit/property/portfolio
    if (unitId) {
      const unit = await this.prisma.unit.findFirst({
        where: { AND: [accessibleBy(ability).Unit, { id: unitId }] },
        select: selectForAuthz.unit,
      });
      toUpdate.unit = unit;
    } else if (propertyId) {
      const property = await this.prisma.property.findFirst({
        where: { AND: [accessibleBy(ability).Property, { id: propertyId }] },
        select: selectForAuthz.property,
      });
      toUpdate.property = property;
    } else if (portfolioId) {
      const portfolio = await this.prisma.portfolio.findFirst({
        where: { AND: [accessibleBy(ability).Portfolio, { id: portfolioId }] },
        select: selectForAuthz.portfolio,
      });
      toUpdate.portfolio = portfolio;
    }

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Update,
      subject('Expense', toUpdate),
    );

    const input: Prisma.ExpenseUpdateArgs['data'] = updateExpenseDto;
    return this.prisma.expense.update({
      where: { id },
      data: input,
    });
  }

  async remove({ id, user }: { id: string; user: IUser }) {
    const data = await this.prisma.expense.findUnique({ where: { id } });

    this.caslAbilityFactory.throwIfForbidden(
      user,
      Action.Delete,
      subject('Expense', data),
    );

    return this.prisma.expense.delete({ where: { id } });
  }
}
