import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { DashboardFilterDto } from 'src/aggregate/dto/aggregate.dto';
import { Occupancy } from 'src/aggregate/dto/occupancy.dto';
import { groupByMonth } from 'src/aggregate/group-by-month';
import { Action } from 'src/casl/casl-ability.factory';
import { parseLocationFilter } from 'src/common/parse-location-filter';
import { ExpensesService } from 'src/expenses/expenses.service';
import { IUser } from 'src/interfaces/user.interface';
import { LeaseInvoiceOptionsDto } from 'src/lease-invoices/dto/lease-invoice-options.dto';
import { LeaseInvoicesService } from 'src/lease-invoices/lease-invoices.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AggregateService {
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
          accessibleBy(user.ability, Action.Read).LeaseInvoice,
          ...this.leaseInvoicesService.parseFilter({ pageOptionsDto }),
        ],
      },
      select: { amount: true, postAt: true },
    });

    return groupByMonth(leaseInvoices);
  }

  async expensesByMonth({
    filter,
    user,
  }: {
    filter?: DashboardFilterDto;
    user: IUser;
  }) {
    const expenses = await this.prisma.expense.findMany({
      where: {
        AND: [
          accessibleBy(user.ability, Action.Read).Expense,
          parseLocationFilter({ filter, entity: 'Expense' }),
          { postAt: { gte: filter?.start, lte: filter?.end } },
        ],
      },
      select: { amount: true, postAt: true },
    });

    return groupByMonth(expenses);
  }

  async getOccupancy({
    filter,
    user,
  }: {
    filter: DashboardFilterDto;
    user: IUser;
  }) {
    const units = await this.prisma.unit.findMany({
      where: {
        AND: [
          accessibleBy(user.ability, Action.Read).Unit,
          parseLocationFilter({ filter, entity: 'Unit' }),
        ],
      },
      select: {
        id: true,
        createdAt: true,
        leases: {
          where: {
            // TODO check if this is correct
            start: { lte: filter.end },
            end: { gte: filter.start },
          },
          select: {
            start: true,
            end: true,
            unitId: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const days: Occupancy[] = [];

    if (!units.length) {
      return days;
    }

    const firstUnitCreatedAt = units[0].createdAt;

    // fallback to getting data for next two years max
    const oneYear = 1000 * 60 * 60 * 24 * 365;
    const end = filter.end || new Date(Date.now() + oneYear * 2);

    // loop through each day in the range
    for (
      let date = firstUnitCreatedAt;
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      // only count units if data is after the unit creation date
      const createdUnits = units.filter((unit) => {
        return unit.createdAt <= date;
      });
      const unitCount = createdUnits.length;

      const occupied = createdUnits.filter((unit) => {
        return unit.leases.some((lease) => {
          return lease.start <= date && lease.end >= date;
        });
      }).length;

      const vacant = unitCount - occupied;
      const occupiedPct = Math.round((occupied / unitCount) * 100);
      const vacantPct = Math.round((vacant / unitCount) * 100);

      days.push({
        date: date.getTime(),
        unitCount,
        occupied,
        occupiedPct,
        vacant,
        vacantPct,
      });
    }

    return days;
  }
}
