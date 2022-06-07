import { Property, Unit } from '$lib/models/classes';
import prismaClient from '$lib/server/prismaClient';
import { getAddress } from '$lib/utils/common';
import { groupOccupancy } from '$lib/utils/group';
import { TRPCError } from '@trpc/server';
import * as R from 'remeda';
import { z } from 'zod';
import { createRouter } from './createRouter';

export const filterSchema = z.object({
	portfolioId: z.string().uuid(),
	start: z.number(),
	end: z.number(),
	propertyId: z.string().uuid().nullish(),
	unitId: z.string().uuid().nullish(),
});

export const charts = createRouter()
	.middleware(({ ctx, next, rawInput }) => {
		const schema = z.object({ portfolioId: z.string().uuid() });
		const input = schema.safeParse(rawInput);
		if (!input.success) {
			throw new TRPCError({ code: 'BAD_REQUEST' });
		}
		if (ctx.authz.id === input.data.portfolioId || ctx.authz.isAdmin) {
			return next();
		}
		throw new TRPCError({ code: 'FORBIDDEN' });
	})
	.query('portfolio', {
		input: z.object({
			portfolioId: z.string().uuid(),
		}),
		resolve: async ({ input }) => {
			const data = await prismaClient.portfolio.findUnique({
				where: { id: input.portfolioId },
				include: { properties: { include: { portfolio: true, units: true } } },
			});
			if (data) {
				data.properties.forEach((p) => {
					p.units.sort((a, b) => {
						const aa = a.unitNumber.match(/\d+/)?.[0] ?? 0;
						const bb = b.unitNumber.match(/\d+/)?.[0] ?? 0;
						return +aa - +bb;
					});
				});
				return data;
			}
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Portfolio not found',
			});
		},
	})
	.query('income', {
		input: filterSchema,
		resolve: async ({
			input: { end, start, portfolioId, propertyId, unitId },
		}) => {
			const data = await prismaClient.portfolio.findUnique({
				where: {
					id: portfolioId,
				},
				include: {
					properties: {
						// take: 5, // TODO remove in prod
						where: propertyId ? { id: propertyId } : {},
						include: {
							units: {
								where: unitId ? { id: unitId } : {},
								include: {
									leases: {
										include: {
											transactions: {
												where: {
													postAt: {
														gte: new Date(start),
														lte: new Date(end),
													},
												},
												select: {
													id: true,
													postAt: true,
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

			// single Portfolio object => array of transactions
			const normalized = data.properties.flatMap((property) =>
				property.units.flatMap((unit) =>
					unit.leases.flatMap((lease) =>
						lease.transactions.flatMap((transaction) => {
							const { amount, isPaid, postAt, id } = transaction;
							const address = getAddress(property);
							const { propertyId } = unit;
							return {
								amount,
								isPaid,
								postAt,
								address,
								propertyId,
								id,
								property,
								unit,
							};
						}),
					),
				),
			);
			const slim = normalized.map((trx) => {
				return {
					...R.pick(trx, [
						'id',
						'amount',
						'isPaid',
						'propertyId',
						'address',
						'postAt',
					]),
					propertyLabel: Property.getLabel(trx.property),
					unitLabel: Unit.getLabel(trx.unit),
				};
			});
			const sorted = R.sortBy(slim, (i) => i.postAt);
			return sorted;
		},
	})
	.query('expenses', {
		input: filterSchema,
		resolve: async ({
			input: { end, start, portfolioId, propertyId, unitId },
		}) => {
			const dated = {
				where: {
					postAt: {
						gte: new Date(start),
						lte: new Date(end),
					},
				},
			};
			const ordered = {
				orderBy: {
					postAt: 'asc' as const,
				},
			};
			const getExpenses = {
				...dated,
				...ordered,
				include: {
					category: true,
				},
			} as const;
			const data = await prismaClient.portfolio.findUnique({
				where: {
					id: portfolioId,
				},
				include: {
					expenses: propertyId || unitId ? false : getExpenses,
					properties: {
						// take: 5, // TODO remove in prod
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
			const portfolioExpenses =
				// if there's a property or unit id, then we only want the expenses for that property or unit
				propertyId || unitId
					? []
					: data.expenses.map((e) => ({
							...e,
							relatedProperty: null,
							categoryLabel: e.category?.en,
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
								categoryLabel: e.category?.en,
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
							categoryLabel: e.category?.en,
						})) || [],
				),
			);
			type Trx =
				| typeof portfolioExpenses[0]
				| typeof propertyExpenses[0]
				| typeof unitExpenses[0];

			const all: Trx[] = [
				...portfolioExpenses,
				...propertyExpenses,
				...unitExpenses,
			];

			const slim = all.map((expense) => {
				return {
					...R.pick(expense, ['id', 'amount', 'categoryId', 'postAt']),
					address: expense.relatedProperty
						? Property.getLabel(expense.relatedProperty)
						: 'Common',
					categoryLabel: expense.categoryLabel,
				};
			});

			const sorted = R.sortBy(slim, (e) => e.postAt);
			return sorted;
		},
	})
	.query('occupancy', {
		input: filterSchema,
		resolve: async ({
			input: { end, start, portfolioId, propertyId, unitId },
		}) => {
			const data = await prismaClient.portfolio.findUnique({
				where: {
					id: portfolioId,
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
