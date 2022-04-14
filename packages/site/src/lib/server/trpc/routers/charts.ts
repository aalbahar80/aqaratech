import prismaClient from '$lib/server/prismaClient';
import { createRouter, isAdmin, isOwner } from '$lib/server/trpc';
import { groupOccupancy } from '$lib/utils/group';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const filterSchema = z.object({
	clientId: z.string().uuid(),
	start: z.number(),
	end: z.number(),
	propertyId: z.string().uuid().nullish(),
	unitId: z.string().uuid().nullish(),
});

export const charts = createRouter()
	.middleware(({ ctx, next, rawInput }) => {
		// Only allow admin or owner
		if (isAdmin(ctx)) {
			return next();
		}

		const schema = z.object({ clientId: z.string().uuid() });
		const input = schema.safeParse(rawInput);
		if (!input.success) {
			throw new TRPCError({ code: 'BAD_REQUEST' });
		}
		if (
			isOwner(ctx) &&
			ctx.accessToken.userMetadata?.idInternal === input.data.clientId
		) {
			return next();
		}
		throw new TRPCError({ code: 'FORBIDDEN' });
	})
	.query('client', {
		input: z.object({
			clientId: z.string().uuid(),
		}),
		resolve: async ({ input }) => {
			const data = await prismaClient.client.findUnique({
				where: { id: input.clientId },
				include: { properties: { include: { client: true, units: true } } },
			});
			if (data) return data;
			throw new TRPCError({ code: 'NOT_FOUND', message: 'Client not found' });
		},
	})
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
														gte: new Date(start),
														lte: new Date(end),
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
						gte: new Date(start),
						lte: new Date(end),
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
			const occupancyData = groupOccupancy(
				data,
				new Date(start),
				new Date(end),
			);
			return occupancyData;
		},
	});
