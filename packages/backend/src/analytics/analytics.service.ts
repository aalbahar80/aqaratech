import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async incomeByMonth(portfolioId: string) {
    // get sum of all leaseInvoices for portfolio and group by month
    const leaseInvoices = await this.prisma.leaseInvoice.findMany({
      where: {
        lease: { unit: { property: { portfolio: { id: portfolioId } } } },
      },
      select: { amount: true, postAt: true },
    });

    return this.groupByMonth(leaseInvoices);
  }

  async expensesByMonth(portfolioId: string) {
    const expenses = await this.prisma.expense.findMany({
      where: { portfolioId },
      select: { amount: true, postAt: true },
    });

    return this.groupByMonth(expenses);
  }

  groupByMonth(
    records: { amount: number; postAt: Date }[],
  ): { monthYear: string; amount: number }[] {
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

    const byMonthArray = Object.keys(byMonth).map((monthYear) => {
      return { monthYear, amount: byMonth[monthYear] };
    });

    return byMonthArray;
  }
}
