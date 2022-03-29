import prismaClient from '$lib/server/prismaClient';
import {
	groupByMonth,
	groupByMonthAndCat,
	groupIncome,
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
			if (data)
				return groupIncome(
					data.map((item) => ({ ...item, date: item.postDate })),
				);
			throw new TRPCError({ code: 'NOT_FOUND', message: 'Unable to get data' });
		},
	})
	.query('expenses', {
		input: filterSchema,
		resolve: async ({ input: { end, start, clientId } }) => {
			const dateFilter = {
				postDate: {
					gte: start,
					lte: end,
				},
			};
			const ordered = {
				orderBy: {
					postDate: 'asc',
				},
			};
			const data = await prismaClient.client.findUnique({
				where: {
					id: clientId,
				},
				select: {
					expenses: {
						where: dateFilter,
						orderBy: {
							postDate: 'asc',
						},
					},
					properties: {
						include: {
							expenses: {
								where: dateFilter,
								orderBy: {
									postDate: 'asc',
								},
							},
							units: {
								include: {
									expenses: {
										where: dateFilter,
										orderBy: {
											postDate: 'asc',
										},
									},
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
			const clientExpenses = data.expenses;
			const propertyExpenses = data.properties.flatMap(
				(property) => property.expenses,
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
			console.log({ sortedExpenses }, 'playground.ts ~ 79');
			const expensesByMonth = groupByMonthAndCat(sortedExpenses);
			return expensesByMonth;
		},
	});
