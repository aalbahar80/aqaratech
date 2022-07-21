import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { DashboardFilterDto } from 'src/analytics/dto/analytics.dto';
import { groupByMonth } from 'src/analytics/group-by-month';
import { ExpensesService } from 'src/expenses/expenses.service';
import { IUser } from 'src/interfaces/user.interface';
import { LeaseInvoiceOptionsDto } from 'src/lease-invoices/dto/lease-invoice-options.dto';
import { LeaseInvoicesService } from 'src/lease-invoices/lease-invoices.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(
    private prisma: PrismaService,
    private leaseInvoicesService: LeaseInvoicesService,
    private expensesService: ExpensesService,
  ) {}

  async incomeByMonth({
    pageOptionsDto,
    user,
  }: {
    pageOptionsDto: LeaseInvoiceOptionsDto;
    user: IUser;
  }) {
    const leaseInvoices = await this.prisma.leaseInvoice.findMany({
      where: {
        AND: [
          accessibleBy(user.ability).LeaseInvoice,
          ...this.leaseInvoicesService.parseFilter({ pageOptionsDto }),
        ],
      },
      select: { amount: true, postAt: true },
    });

    return groupByMonth(leaseInvoices);
  }

  async expensesByMonth({ filter }: { filter?: DashboardFilterDto }) {
    // TODO ability check
    const expenses = await this.prisma.expense.findMany({
      where: {
        AND: [
          this.expensesService.parseLocationFilter({ filter }),
          { postAt: { gte: filter?.start, lte: filter?.end } },
        ],
      },
      select: { amount: true, postAt: true },
    });

    return groupByMonth(expenses);
  }
}
