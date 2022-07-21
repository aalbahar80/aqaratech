import { Injectable } from '@nestjs/common';
import { DashboardFilterDto } from 'src/analytics/dto/analytics.dto';
import { groupByMonth } from 'src/analytics/group-by-month';
import { ExpensesService } from 'src/expenses/expenses.service';
import { LeaseInvoicesService } from 'src/lease-invoices/lease-invoices.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(
    private prisma: PrismaService,
    private leaseInvoicesService: LeaseInvoicesService,
    private expensesService: ExpensesService,
  ) {}

  async incomeByMonth({ filter }: { filter?: DashboardFilterDto }) {
    // get sum of all leaseInvoices for portfolio and group by month
    // TODO abilitycheck
    const leaseInvoices = await this.prisma.leaseInvoice.findMany({
      where: {
        AND: [
          this.leaseInvoicesService.parseLocationFilter({ filter }),
          { postAt: { gte: filter?.start, lte: filter?.end } },
        ],
      },
      select: { amount: true, postAt: true },
    });

    return groupByMonth(leaseInvoices);
  }

  async expensesByMonth({ filter }: { filter?: DashboardFilterDto }) {
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
