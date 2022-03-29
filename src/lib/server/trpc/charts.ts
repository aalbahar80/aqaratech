import prismaClient from '$lib/server/prismaClient';
import {
	groupByMonthAndCat,
	groupIncome,
	groupIncomeByProperty,
	groupOccupancy,
} from '$lib/utils/group';
import { strToDate } from '$lib/zodTransformers';
import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const filterSchema = z.object({
	clientId: z.string().uuid(),
	start: z.preprocess(strToDate, z.date()),
	end: z.preprocess(strToDate, z.date()),
	propertyId: z.string().uuid().nullish(),
	unitId: z.string().uuid().nullish(),
});

export default trpc
	.router()
	.query('income', {
		input: filterSchema,
		resolve: async ({
			input: { end, start, propertyId, clientId, unitId },
		}) => {
			const data = await prismaClient.transaction.findMany({
				where: {
					postDate: {
						gte: start,
						lte: end,
					},
					lease: unitId
						? { unitId }
						: {
								unit: propertyId
									? {
											propertyId,
									  }
									: {
											property: {
												clientId,
											},
									  },
						  },
				},
				select: {
					postDate: true,
					amount: true,
					isPaid: true,
				},
				orderBy: {
					postDate: 'asc',
				},
			});
			if (!data) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Unable to get data',
				});
			}
			return groupIncome(
				data.map((item) => ({ ...item, date: item.postDate })),
			);
		},
	})
	.query('income:byProperty', {
		input: filterSchema,
		resolve: async ({
			input: { end, start, propertyId, clientId, unitId },
		}) => {
			const data = await prismaClient.transaction.findMany({
				where: {
					postDate: {
						gte: start,
						lte: end,
					},
					lease: unitId
						? { unitId }
						: {
								unit: propertyId
									? {
											propertyId,
									  }
									: {
											property: {
												clientId,
											},
									  },
						  },
				},
				select: {
					postDate: true,
					amount: true,
					isPaid: true,
					leaseId: true,
					lease: {
						include: {
							unit: {
								include: {
									property: true,
								},
							},
						},
					},
				},
				orderBy: {
					postDate: 'asc',
				},
			});
			if (!data) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Unable to get data',
				});
			}
			// return data;
			return groupIncomeByProperty(
				data.map((item) => ({ ...item, date: item.postDate })),
			);
		},
	})
	.query('expenses', {
		input: filterSchema,
		resolve: async ({
			input: { end, start, clientId, propertyId, unitId },
		}) => {
			const dated = {
				where: {
					postDate: {
						gte: start,
						lte: end,
					},
				},
			};
			const ordered = {
				orderBy: {
					postDate: 'asc' as const,
				},
			};
			const getExpenses = {
				...dated,
				...ordered,
			};
			const data = await prismaClient.client.findUnique({
				where: {
					id: clientId,
				},
				include: {
					expenses: propertyId || unitId ? false : getExpenses,
					properties: {
						where: propertyId ? { id: propertyId } : {},
						include: {
							expenses: unitId ? false : getExpenses,
							units: {
								where: unitId ? { id: unitId } : {},
								include: {
									expenses: getExpenses,
								},
							},
						},
					},
				},
			});
			if (!data) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Unable to get data',
				});
			}

			// group all expenses in one array
			const clientExpenses = data.expenses || [];
			const propertyExpenses = data.properties.flatMap(
				(property) => property.expenses || [],
			);
			const unitExpenses = data.properties.flatMap((property) =>
				property.units.flatMap((unit) => unit.expenses),
			);
			const allExpenses = [
				...clientExpenses,
				...propertyExpenses,
				...unitExpenses,
			];
			// create a new sorted array by postDate ascending
			// Can replace with lodash.soryBy
			const sortedExpenses = allExpenses
				.slice()
				.sort((a, b) => a.postDate.getTime() - b.postDate.getTime());
			const expensesByMonth = groupByMonthAndCat(sortedExpenses);
			return expensesByMonth;
		},
	})
	.query('occupancy', {
		input: filterSchema,
		resolve: async ({
			input: { end, start, clientId, propertyId, unitId },
		}) => {
			const data = await prismaClient.client.findUnique({
				where: {
					id: clientId,
				},
				include: {
					properties: {
						where: propertyId ? { id: propertyId } : {},
						include: {
							units: {
								where: unitId ? { id: unitId } : {},
								include: {
									leases: true,
								},
							},
						},
					},
				},
			});
			if (!data) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Unable to get data',
				});
			}
			const occupancyData = groupOccupancy(data, start, end);
			return occupancyData;
		},
	});
