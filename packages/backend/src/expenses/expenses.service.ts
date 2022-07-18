import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import * as R from 'remeda';
import { Action } from 'src/casl/casl-ability.factory';
import {
  BreadcrumbDto,
  PortfolioLabelParams,
  PropertyLabelParams,
  UnitLabelParams,
} from 'src/common/dto/breadcrumb.dto';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { Rel } from 'src/constants/rel.enum';
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
    ]);
    return this.prisma.expense.create({
      data: {
        ...toCreate,
        ...(createExpenseDto.portfolioId && {
          portfolio: { connect: { id: createExpenseDto.portfolioId } },
        }),
        ...(createExpenseDto.propertyId && {
          property: { connect: { id: createExpenseDto.propertyId } },
        }),
        ...(createExpenseDto.unitId && {
          unit: { connect: { id: createExpenseDto.unitId } },
        }),
        // ...(createExpenseDto.maintenanceOrderId && {
        //   unit: { connect: { id: createExpenseDto.maintenanceOrderId } },
        // }),
      },
    });
  }

  async findAll({
    pageOptionsDto,
    user,
  }: {
    pageOptionsDto: PageOptionsDto;
    user: IUser;
  }): Promise<WithCount<ExpenseDto>> {
    const { page, take } = pageOptionsDto;

    let [results, total] = await Promise.all([
      this.prisma.expense.findMany({
        take,
        skip: (page - 1) * take,
        where: accessibleBy(user.ability).Expense,
        include: {
          portfolio: true,
          property: true,
          unit: true,
        },
      }),
      this.prisma.expense.count({
        where: accessibleBy(user.ability).Expense,
      }),
    ]);

    const expenses = results.map((expense) => ({
      ...expense,
      breadcrumbs: this.breadcrumbs(expense),
    }));

    return { total, results: expenses };
  }

  async findOne({ id }: { id: string }) {
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    return { ...expense, breadcrumbs: this.breadcrumbs(expense) };
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
    property: PropertyLabelParams;
    unit: UnitLabelParams;
  }): ExpenseBreadcrumbsDto | undefined {
    if (expense.portfolio) {
      return {
        portfolio: new BreadcrumbDto({
          rel: Rel.Portfolio,
          ...expense.portfolio,
        }),
      };
    }
    if (expense.property) {
      return {
        property: new BreadcrumbDto({
          rel: Rel.Property,
          ...expense.property,
        }),
      };
    }
    if (expense.unit) {
      return {
        unit: new BreadcrumbDto({
          rel: Rel.Unit,
          ...expense.unit,
        }),
      };
    }
  }
}
