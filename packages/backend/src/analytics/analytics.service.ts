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

    const leaseInvoicesByMonth = leaseInvoices.reduce<Record<string, number>>(
      (acc, leaseInvoice) => {
        const date = leaseInvoice.postAt.toISOString().split('T')[0];
        const month = date.split('-')[1];
        const year = date.split('-')[0];
        const monthYear = `${month}-${year}`;
        if (acc[monthYear]) {
          acc[monthYear] += leaseInvoice.amount;
        } else {
          acc[monthYear] = leaseInvoice.amount;
        }
        return acc;
      },
      {},
    );

    const leaseInvoicesByMonthArray = Object.keys(leaseInvoicesByMonth).map(
      (monthYear) => {
        return {
          monthYear,
          amount: leaseInvoicesByMonth[monthYear],
        };
      },
    );

    return leaseInvoicesByMonthArray;
  }

  // groupByMonth(records: {amount: number, postAt: Date}[]): {monthYear: string, amount: number}[] {

  // }
}
