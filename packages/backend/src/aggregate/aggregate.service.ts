import { ForbiddenError, subject } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { AggregateOptionsDto } from 'src/aggregate/dto/aggregate-options.dto';
import { Occupancy } from 'src/aggregate/dto/occupancy.dto';
import { groupByMonth } from 'src/aggregate/group-by-month';
import { Action } from 'src/casl/action.enum';
import { PaidStatus } from 'src/constants/paid-status.enum';
import { IUser } from 'src/interfaces/user.interface';
import { LeaseInvoicesService } from 'src/lease-invoices/lease-invoices.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AggregateService {
	constructor(
		private readonly prisma: PrismaService,
		private leaseInvoicesService: LeaseInvoicesService,
	) {}

	// eslint-disable-next-line @typescript-eslint/require-await
	async incomeByMonth() {
		throw new Error('Deprecated');

		// const leaseInvoices = await this.prisma.leaseInvoice.findMany({
		// 	where: {
		// 		AND: [
		// 			accessibleBy(user.ability, Action.Read).LeaseInvoice,
		// 			...this.leaseInvoicesService.parseFilter({ pageOptionsDto }),
		// 		],
		// 	},
		// 	select: { amount: true, postAt: true },
		// });

		// return groupByMonth(leaseInvoices);
	}

	async portfolioIncomeByMonth({
		organizationId,
		portfolioId,
		options,
		paidStatus,
	}: {
		organizationId: string;
		portfolioId: string;
		options: AggregateOptionsDto;
		paidStatus: PaidStatus;
	}) {
		const leaseInvoices = await this.prisma.leaseInvoice.findMany({
			where: {
				AND: [
					{
						organizationId,
						portfolioId,
						postAt: { gte: options.start, lte: options.end },
					},
					this.leaseInvoicesService.parseLocationFilter({
						filter: {
							portfolioId,
							propertyId: options.propertyId,
							unitId: options.unitId,
						},
					}),
					this.leaseInvoicesService.parseIsPaidFilter({ paidStatus }),
				],
			},
			select: { amount: true, postAt: true },
		});

		const grouped = groupByMonth(leaseInvoices, {
			includeEmptyMonths: true,
			start: options.start,
			end: options.end,
		});

		return grouped;
	}

	async portfolioExpensesByMonth({
		organizationId,
		portfolioId,
		options,
	}: {
		organizationId: string;
		portfolioId: string;
		options: AggregateOptionsDto;
	}) {
		const expenses = await this.prisma.expense.findMany({
			where: {
				AND: [
					{
						organizationId,
						portfolioId,
						propertyId: options.propertyId,
						unitId: options.unitId,
						postAt: { gte: options.start, lte: options.end },
					},
				],
			},
			select: { amount: true, postAt: true },
		});

		const grouped = groupByMonth(expenses, {
			includeEmptyMonths: true,
			start: options.start,
			end: options.end,
		});

		return grouped;
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async expensesByMonth() {
		throw new Error('Deprecated');
		// const expenses = await this.prisma.expense.findMany({
		// 	where: {
		// 		AND: [
		// 			accessibleBy(user.ability, Action.Read).Expense,
		// 			parseLocationFilter({ filter, entity: 'Expense' }),
		// 			{ postAt: { gte: filter?.start, lte: filter?.end } },
		// 		],
		// 	},
		// 	select: { amount: true, postAt: true },
		// });

		// return groupByMonth(expenses);
	}

	async getOccupancy({
		organizationId,
		portfolioId,
		options,
	}: {
		organizationId: string;
		portfolioId: string;
		options: AggregateOptionsDto;
	}) {
		const units = await this.prisma.unit.findMany({
			where: {
				organizationId,
				portfolioId,
				propertyId: options.propertyId,
				id: options.unitId,
			},
			select: {
				id: true,
				createdAt: true,
				leases: {
					where: {
						// TODO check if this is correct
						start: { lte: options.end },
						end: { gte: options.start },
					},
					select: {
						start: true,
						end: true,
						unitId: true,
					},
				},
			},
			orderBy: {
				createdAt: 'asc',
			},
		});

		const days: Occupancy[] = [];

		if (!units.length) {
			return days;
		}

		// avoid looping over dates where no units are created
		const firstUnitCreatedAt = units[0].createdAt;
		const start =
			/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
			new Date(options.start) > firstUnitCreatedAt
				? new Date(options.start)
				: firstUnitCreatedAt;

		// fallback to getting data for next two years max
		const oneYear = 1000 * 60 * 60 * 24 * 365;
		const end = new Date(options.end) ?? new Date(Date.now() + oneYear * 2);

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

			// const vacant = unitCount - occupied;
			const occupiedPct = Math.round((occupied / unitCount) * 100);

			days.push({
				date: date.getTime(),
				occupiedPct,
				// occupied,
				// vacantPct,
				// vacant,
				// unitCount,
			});
		}

		return days;
	}

	async getBalance({
		portfolioId,
		user,
	}: {
		portfolioId: string;
		user: IUser;
	}) {
		const portfolio = await this.prisma.portfolio.findUniqueOrThrow({
			where: { id: portfolioId },
			select: {
				id: true,
				organizationId: true,
			},
		});

		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Read,
			subject('Portfolio', portfolio),
		);

		const [leaseInvoices, expenses, payouts] = await Promise.all([
			this.prisma.leaseInvoice.aggregate({
				_sum: { amount: true },
				where: {
					portfolioId: portfolioId,
					isPaid: true,
				},
			}),
			this.prisma.expense.aggregate({
				_sum: { amount: true },
				where: {
					portfolioId: portfolioId,
				},
			}),
			this.prisma.payout.aggregate({
				_sum: { amount: true },
				where: {
					portfolioId: portfolioId,
				},
			}),
		]);

		const leaseInvoiceSum = leaseInvoices._sum.amount ?? 0;
		const expenseSum = expenses._sum.amount ?? 0;
		const payoutSum = payouts._sum.amount ?? 0;

		const total = leaseInvoiceSum - expenseSum - payoutSum;

		const sum = {
			leaseInvoices: leaseInvoiceSum,
			expenses: expenseSum,
			payouts: payoutSum,
			total,
		};

		return sum;
	}
}
