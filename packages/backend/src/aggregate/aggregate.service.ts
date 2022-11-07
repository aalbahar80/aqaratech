import { ForbiddenError, subject } from '@casl/ability';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
	AggregateOptionsDto,
	AggregateOptionsExpensesDto,
} from 'src/aggregate/dto/aggregate-options.dto';
import { Occupancy } from 'src/aggregate/dto/occupancy.dto';
import { groupByCategory } from 'src/aggregate/group-by-category';
import { groupByLocation } from 'src/aggregate/group-by-location';
import { groupByMonth } from 'src/aggregate/group-by-month';
import { Action } from 'src/casl/action.enum';
import { PaidStatus } from 'src/constants/paid-status.enum';
import { IUser } from 'src/interfaces/user.interface';
import { LeaseInvoicesService } from 'src/lease-invoices/lease-invoices.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PropertyDto } from 'src/properties/dto/property.dto';
import { getUnitLabel } from 'src/utils/address';

@Injectable()
export class AggregateService {
	constructor(
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
		private readonly prisma: PrismaService,
		private leaseInvoicesService: LeaseInvoicesService,
	) {}

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

	async portfolioExpenses({
		organizationId,
		portfolioId,
		options,
	}: {
		organizationId: string;
		portfolioId: string;
		options: AggregateOptionsExpensesDto;
	}) {
		const expenses = await this.prisma.expense.findMany({
			where: {
				AND: [
					{
						organizationId,
						portfolioId,
						...this.parseLocationFilter(options),
						postAt: { gte: options.start, lte: options.end },
					},
				],
			},
			// TODO consider getting field names as a parameter to this function
			select: {
				amount: true,
				postAt: true,

				// Group by category
				categoryId: true,

				// Group by location
				portfolioId: true,
				propertyId: true,
				unitId: true,
				unit: {
					select: {
						propertyId: true,
					},
				},
			},
		});

		return expenses;
	}

	async portfolioExpensesByMonth({
		organizationId,
		portfolioId,
		options,
	}: {
		organizationId: string;
		portfolioId: string;
		options: AggregateOptionsExpensesDto;
	}) {
		const expenses = await this.portfolioExpenses({
			organizationId,
			portfolioId,
			options,
		});

		const grouped = groupByMonth(expenses, {
			includeEmptyMonths: true,
			start: options.start,
			end: options.end,
		});

		return grouped;
	}

	async portfolioExpensesByCategory({
		organizationId,
		portfolioId,
		options,
	}: {
		organizationId: string;
		portfolioId: string;
		options: AggregateOptionsExpensesDto;
	}) {
		const expenses = await this.portfolioExpenses({
			organizationId,
			portfolioId,
			options,
		});

		const grouped = groupByCategory(expenses);

		return grouped;
	}

	async portfolioExpensesByLocation({
		organizationId,
		portfolioId,
		options,
	}: {
		organizationId: string;
		portfolioId: string;
		options: AggregateOptionsExpensesDto;
	}) {
		const expenses = await this.portfolioExpenses({
			organizationId,
			portfolioId,
			options,
		});

		const grouped = groupByLocation(expenses);

		// Add property label or unit label to each location
		const units = await this.prisma.unit.findMany({
			where: {
				organizationId,
				portfolioId,
				OR: [
					{ propertyId: { in: grouped.map((g) => g.propertyId ?? '') } },
					{ id: { in: grouped.map((g) => g.unitId ?? '') } },
				],
			},
			include: { property: true },
		});

		const withLabels = grouped.map((g) => {
			const unit = units.find((u) => u.id === g.unitId);
			// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
			const unitTitle = unit ? unit.label || getUnitLabel(unit) : null;

			const property = units.find(
				(u) => u.propertyId === g.propertyId,
			)?.property;
			const propertyTitle = property ? new PropertyDto(property).title : null;

			if (g.unitId && unit && propertyTitle) {
				// Add unitTitle to expenses where unitId is set
				return {
					...g,
					unitTitle,
					propertyTitle,
				};
			} else if (g.propertyId && propertyTitle) {
				// Add propertyTitle to expenses where propertyId is set
				return {
					...g,
					unitTitle: null,
					propertyTitle,
				};
			} else {
				// For expenses where neither unitId nor propertyId is set, set titles to null
				return {
					...g,
					unitTitle: null,
					propertyTitle: null,
				};
			}
		});

		return withLabels;
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
			this.logger.verbose?.(
				'No units found - getOccupancy',
				AggregateService.name,
			);
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

	// TODO use satisfies type
	parseLocationFilter = (
		filter: Pick<AggregateOptionsExpensesDto, 'propertyId' | 'unitId'>,
	): Prisma.ExpenseWhereInput => {
		if (filter.unitId) {
			return {
				// Get expenses associated with the unit
				unitId: filter.unitId,
			};
		} else if (typeof filter.propertyId === 'string') {
			return {
				OR: [
					// Get expenses associated with the property directly
					{ propertyId: filter.propertyId },

					// OR

					// Get expenses associated with the property's units
					{
						unit: {
							propertyId: filter.propertyId,
						},
					},
				],
			};
		} else if (filter.propertyId === null) {
			// Get expenses which are not associated with any property
			return {
				propertyId: null,
				unitId: null,
			};
		} else {
			return {};
		}
	};
}
