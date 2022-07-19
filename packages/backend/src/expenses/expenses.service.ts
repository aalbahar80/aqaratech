import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as R from 'remeda';
import { Action } from 'src/casl/casl-ability.factory';
import {
  BreadcrumbDto,
  PortfolioLabelParams,
  PropertyLabelParams,
  UnitLabelParams,
} from 'src/common/dto/breadcrumb.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { Rel } from 'src/constants/rel.enum';
import { ExpensePageOptionsDto } from 'src/expenses/dto/expense-page-options.dto';
import {
  CreateExpenseDto,
  ExpenseBreadcrumbsDto,
  ExpenseDto,
  UpdateExpenseDto,
} from 'src/expenses/dto/expense.dto';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async create({
    createExpenseDto,
    user,
  }: {
    createExpenseDto: CreateExpenseDto;
    user: IUser;
  }) {
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Create,
      subject('Expense', createExpenseDto),
    );

    const toCreate = R.omit(createExpenseDto, [
      'portfolioId',
      'propertyId',
      'unitId',
      'maintenanceOrderId',
      'categoryId',
    ]);
    return this.prisma.expense.create({
      data: {
        ...toCreate,
        portfolio: { connect: { id: createExpenseDto.portfolioId } },
        ...(createExpenseDto.propertyId && {
          property: { connect: { id: createExpenseDto.propertyId } },
        }),
        ...(createExpenseDto.unitId && {
          unit: { connect: { id: createExpenseDto.unitId } },
        }),
        // ...(createExpenseDto.maintenanceOrderId && {
        //   unit: { connect: { id: createExpenseDto.maintenanceOrderId } },
        // }),
        ...(createExpenseDto.categoryId && {
          expenseType: { connect: { id: createExpenseDto.categoryId } },
        }),
      },
    });
  }

  async findAll({
    pageOptionsDto,
    user,
  }: {
    pageOptionsDto: ExpensePageOptionsDto;
    user: IUser;
  }): Promise<WithCount<ExpenseDto>> {
    const { page, take, start, end } = pageOptionsDto;

    const filter: Prisma.ExpenseWhereInput = {
      AND: [
        accessibleBy(user.ability).Expense,
        this.parseLocationFilter({ filter: pageOptionsDto }),
        { postAt: { gte: start, lte: end } },
      ],
    };

    let [results, total] = await Promise.all([
      this.prisma.expense.findMany({
        take,
        skip: (page - 1) * take,
        where: filter,
        include: {
          portfolio: true,
          property: true,
          unit: true,
        },
      }),
      this.prisma.expense.count({ where: filter }),
    ]);

    const expenses = results.map((expense) => {
      const { portfolio, property, unit } = expense;
      return {
        ...expense,
        breadcrumbs: this.breadcrumbs({ portfolio, property, unit }),
      };
    });

    return { total, results: expenses };
  }

  async findOne({ id }: { id: string }) {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
      include: {
        portfolio: true,
        property: true,
        unit: true,
      },
    });
    const { portfolio, property, unit } = expense;

    return {
      ...expense,
      breadcrumbs: this.breadcrumbs({ portfolio, property, unit }),
    };
  }

  update({
    id,
    updateExpenseDto,
    user,
  }: {
    id: string;
    updateExpenseDto: UpdateExpenseDto;
    user: IUser;
  }) {
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Update,
      subject('Expense', { id, ...updateExpenseDto }),
    );

    return this.prisma.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
  }

  remove({ id }: { id: string }) {
    return this.prisma.expense.delete({ where: { id } });
  }

  // ::: HELPERS :::

  breadcrumbs(expense: {
    portfolio: PortfolioLabelParams;
    property: PropertyLabelParams | null;
    unit: UnitLabelParams | null;
  }): ExpenseBreadcrumbsDto {
    const crumbs: ExpenseBreadcrumbsDto = {
      portfolio: new BreadcrumbDto({
        rel: Rel.Portfolio,
        ...expense.portfolio,
      }),
    };

    if (expense.property) {
      crumbs.property = new BreadcrumbDto({
        rel: Rel.Property,
        ...expense.property,
      });
    }

    if (expense.unit) {
      crumbs.unit = new BreadcrumbDto({
        rel: Rel.Unit,
        ...expense.unit,
      });
    }

    return crumbs;
  }

  parseLocationFilter({ filter }: { filter?: ExpensePageOptionsDto }) {
    let locationFilter: Prisma.ExpenseWhereInput;
    if (filter?.unitId) {
      locationFilter = { unitId: filter.unitId };
    } else if (filter?.propertyId) {
      locationFilter = { propertyId: filter.propertyId };
    } else {
      locationFilter = { portfolioId: filter?.portfolioId };
    }
    return locationFilter;
  }
}
