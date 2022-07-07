import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import * as R from 'remeda';
import { Action } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PaginatedDto, PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { Rel } from 'src/constants/rel.enum';
import {
  CreateExpenseDto,
  ExpenseBreadcrumbsDto,
  ExpenseDto,
  UpdateExpenseDto,
} from 'src/expenses/dto/expense.dto';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { search } from 'src/utils/search';

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
  }): Promise<PaginatedMetaDto<ExpenseDto>> {
    const { page, take, q } = pageOptionsDto;

    let [results, itemCount] = await Promise.all([
      this.prisma.expense.findMany({
        take,
        skip: (page - 1) * take,
        where: accessibleBy(user.ability).Expense,
      }),
      this.prisma.expense.count({
        where: accessibleBy(user.ability).Expense,
      }),
    ]);

    if (q) {
      results = search({ data: results, q, keys: ['id', 'memo', 'amount'] });
    }

    const pagination = new PaginatedDto({
      itemCount,
      pageOptionsDto: pageOptionsDto,
      pageSize: results.length,
    });

    return { pagination, results };
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
    portfolioId: string | null;
    propertyId: string | null;
    unitId: string | null;
  }): ExpenseBreadcrumbsDto | undefined {
    if (expense.portfolioId) {
      return {
        portfolio: {
          rel: Rel.Portfolio,
          href: `/portfolios/${expense.portfolioId}`,
        },
      };
    }
    if (expense.propertyId) {
      return {
        property: {
          rel: Rel.Property,
          href: `/properties/${expense.propertyId}`,
        },
      };
    }
    if (expense.unitId) {
      return {
        unit: {
          rel: Rel.Unit,
          href: `/units/${expense.unitId}`,
        },
      };
    }
  }
}
