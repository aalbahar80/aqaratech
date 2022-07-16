import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DashboardFilterDto } from 'src/analytics/dto/analytics.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async incomeByMonth({
    portfolioId,
    filter,
  }: {
    portfolioId: string;
    filter?: DashboardFilterDto;
  }) {
    // get sum of all leaseInvoices for portfolio and group by month
    // TODO abilitycheck
    const leaseInvoices = await this.prisma.leaseInvoice.findMany({
      where: {
        AND: [
          this.parseInvoiceLocationFilter({ portfolioId, filter }),
          { postAt: { gte: filter?.start, lte: filter?.end } },
        ],
      },
      select: { amount: true, postAt: true },
    });

    return this.groupByMonth(leaseInvoices);
  }

  async expensesByMonth({
    portfolioId,
    filter,
  }: {
    portfolioId: string;
    filter?: DashboardFilterDto;
  }) {
    const expenses = await this.prisma.expense.findMany({
      where: {
        AND: [
          this.parseExpenseLocationFilter({ portfolioId, filter }),
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
      return aDate.getTime() - bDate.getTime();
    });

    return byMonthArray;
  }

  parseInvoiceLocationFilter({
    portfolioId,
    filter,
  }: {
    portfolioId: string;
    filter?: DashboardFilterDto;
  }) {
    let locationFilter: Prisma.LeaseInvoiceWhereInput;
    if (filter?.unitId) {
      locationFilter = { lease: { unit: { id: filter.unitId } } };
    } else if (filter?.propertyId) {
      locationFilter = { lease: { unit: { propertyId: filter.propertyId } } };
    } else {
      locationFilter = { lease: { unit: { property: { portfolioId } } } };
    }
    return locationFilter;
  }

  parseExpenseLocationFilter({
    portfolioId,
    filter,
  }: {
    portfolioId: string;
    filter?: DashboardFilterDto;
  }) {
    let locationFilter: Prisma.ExpenseWhereInput;
    if (filter?.unitId) {
      locationFilter = { unitId: filter.unitId };
    } else if (filter?.propertyId) {
      locationFilter = { propertyId: filter.propertyId };
    } else {
      locationFilter = { portfolioId };
    }
    return locationFilter;
  }
}
