import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as R from 'remeda';
import { DashboardFilterDto } from 'src/aggregate/dto/aggregate.dto';
import { Action } from 'src/casl/casl-ability.factory';
import { crumbs } from 'src/common/breadcrumb-select';
import { WithCount } from 'src/common/dto/paginated.dto';
import { ExpensePageOptionsDto } from 'src/expenses/dto/expense-page-options.dto';
import {
  CreateExpenseDto,
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
    const created = await this.prisma.expense.create({
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
    return created.id;
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

    let [data, total] = await Promise.all([
      this.prisma.expense.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: { postAt: 'desc' },
        where: filter,
        include: {
          expenseType: true,
          portfolio: crumbs.portfolio,
          property: crumbs.property,
          unit: crumbs.unit,
        },
      }),
      this.prisma.expense.count({ where: filter }),
    ]);

    return { total, results: data.map((e) => new ExpenseDto(e)) };
  }

  async findOne({ id }: { id: string }) {
    const data = await this.prisma.expense.findUnique({
      where: { id },
      include: {
        expenseType: true,
        portfolio: crumbs.portfolio,
        property: crumbs.property,
        unit: crumbs.unit,
      },
    });

    return new ExpenseDto(data);
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
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Update,
      subject('Expense', { id, ...updateExpenseDto }),
    );

    const updated = await this.prisma.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
    return updated.id;
  }

  async remove({ id }: { id: string }) {
    const deleted = await this.prisma.expense.delete({ where: { id } });
    return deleted.id;
  }

  // ::: HELPERS :::

  parseLocationFilter({ filter }: { filter?: DashboardFilterDto }) {
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
