import { Injectable } from '@nestjs/common';
import { DashboardFilterDto } from 'src/analytics/dto/analytics.dto';
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

    return this.groupByMonth(leaseInvoices);
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

    return this.groupByMonth(expenses);
  }

  groupByMonth(
    records: { amount: number; postAt: Date }[],
  ): { date: string; amount: number }[] {
    const byMonth = records.reduce<Record<string, number>>((acc, record) => {
      const date = record.postAt.toISOString().split('T')[0];
      const month = date.split('-')[1];
      const year = date.split('-')[0];
      const monthYear = `${month}-${year}`;
      if (acc[monthYear]) {
        acc[monthYear] += record.amount;
      } else {
        acc[monthYear] = record.amount;
      }
      return acc;
    }, {});

    // return dates as ISO strings
    const byMonthArray = Object.keys(byMonth).map((monthYear) => {
      return {
        date: `${monthYear.split('-')[1]}-${
          monthYear.split('-')[0]
        }-01T00:00:00.000Z`,
        amount: byMonth[monthYear],
      };
    });

    // sort by date
    byMonthArray.sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return bDate.getTime() - aDate.getTime();
    });

    return byMonthArray;
  }
}
