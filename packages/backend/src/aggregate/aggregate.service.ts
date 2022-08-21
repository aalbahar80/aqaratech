import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { DashboardFilterDto } from 'src/aggregate/dto/aggregate.dto';
import { groupByMonth } from 'src/aggregate/group-by-month';
import { Action } from 'src/casl/casl-ability.factory';
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
          this.expensesService.parseLocationFilter({ filter }),
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
    const start = filter.start;
    const end = filter.end;

    const units = await this.prisma.unit.findMany({
      where: {
        AND: [
          accessibleBy(user.ability, Action.Read).Unit,
          // this.expensesService.parseLocationFilter({ filter }),
        ],
      },
      select: {
        id: true,
        createdAt: true,
        leases: {
          where: {
            // TODO check if this is correct
            start: { lte: end },
            end: { gte: start },
          },
          select: {
            start: true,
            end: true,
            unitId: true,
          },
        },
      },
    });

    type Occupancy = {
      date: Date;
      unitCount: number;
      occupied: number;
      occupiedPct: number;
      vacant: number;
      vacantPct: number;
    };

    const days: Occupancy[] = [];

    // loop through each day in the range
    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
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
        date: new Date(date),
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
