import prismaClient from '$lib/server/prismaClient';
import { groupOccupancy } from '$lib/utils/group';
import { strToDate } from '$lib/zodTransformers';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './router';

export const filterSchema = z.object({
	clientId: z.string().uuid(),
	start: z.preprocess(strToDate, z.date()),
	end: z.preprocess(strToDate, z.date()),
	propertyId: z.string().uuid().nullish(),
	unitId: z.string().uuid().nullish(),
});

const charts = createRouter()
	.query('income', {
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
						take: 5, // TODO remove in prod
						where: propertyId ? { id: propertyId } : {},
						include: {
							units: {
								where: unitId ? { id: unitId } : {},
								include: {
									leases: {
										include: {
											transactions: {
												where: {
													postDate: {
														gte: start,
														lte: end,
													},
												},
												select: {
													postDate: true,
													amount: true,
													isPaid: true,
												},
											},
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
			return data;
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
						take: 5, // TODO remove in prod
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
			const clientExpenses =
				// if there's a property or unit id, then we only want the expenses for that property or unit
				propertyId || unitId
					? []
					: data.expenses.map((e) => ({
							...e,
							relatedProperty: null,
					  })) || [];
			const propertyExpenses = unitId
				? // if there's a unit id, then we only want the expenses for that unit
				  []
				: data.properties.flatMap(
						(property) =>
							property.expenses.map((e) => ({
								...e,
								relatedProperty: {
									area: property.area,
									block: property.block,
									street: property.street,
									number: property.number,
								},
							})) || [],
				  );
			const unitExpenses = data.properties.flatMap((property) =>
				property.units.flatMap(
					(unit) =>
						unit.expenses.map((e) => ({
							...e,
							relatedProperty: {
								area: property.area,
								block: property.block,
								street: property.street,
								number: property.number,
							},
						})) || [],
				),
			);
			type P =
				| typeof clientExpenses[0]
				| typeof propertyExpenses[0]
				| typeof unitExpenses[0];
			const allExpenses: P[] = [
				...clientExpenses,
				...propertyExpenses,
				...unitExpenses,
			];
			// Can replace with lodash.soryBy
			const sortedExpenses = allExpenses
				.slice()
				.sort((a, b) => a.postDate.getTime() - b.postDate.getTime());
			return sortedExpenses;
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

export default charts;
