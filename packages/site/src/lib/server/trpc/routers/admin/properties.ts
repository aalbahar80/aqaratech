import { Property } from '$lib/models/classes/property.class';
import prismaClient from '$lib/server/prismaClient';
import { paginationSchema } from '$models/common';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './createRouter';

export const properties = createRouter()
	.query('read', {
		input: z.string().uuid(),
		resolve: async ({ input: id }) => {
			const data = await prismaClient.property.findUnique({
				where: {
					id,
				},
				include: {
					units: {
						orderBy: { unitNumber: 'asc' },
						include: {
							leases: {
								orderBy: { end: 'desc' },
								take: 2,
							},
						},
					},
				},
			});
			if (!data) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Property not found',
				});
			}
			// sort units by unitNumber
			data.units.sort((a, b) => {
				const aa = a.unitNumber.match(/\d+/)?.[0] ?? 0;
				const bb = b.unitNumber.match(/\d+/)?.[0] ?? 0;
				return +aa - +bb;
			});
			return data;
		},
	})
	.query('basic', {
		input: z.string(),
		resolve: async ({ input: id }) => {
			const data = await prismaClient.property.findUnique({
				where: {
					id,
				},
				include: {
					portfolio: true,
				},
			});

			if (!data) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Property not found',
				});
			}
			return data;
		},
	})
	.query('list', {
		input: paginationSchema.extend({
			portfolioId: z.string().uuid().optional(),
			query: z.string().optional(),
		}),
		resolve: async ({ input: { query, portfolioId, pageIndex, size } }) => {
			let filter = {};
			if (portfolioId) {
				filter = { portfolioId };
			} else if (query) {
				filter = {
					OR: [
						{ id: { contains: query } },
						{ area: { contains: query } },
						{ block: { contains: query } },
						{ street: { contains: query } },
						{ avenue: { contains: query } },
						{ number: { contains: query } },
					],
				};
			}
			const data = await prismaClient.property.findMany({
				where: filter,
				take: size,
				skip: size * (pageIndex - 1),
				orderBy: {
					updatedAt: 'desc',
				},
			});
			const pagination = {
				size: size,
				start: size * (pageIndex - 1) + 1,
				pageIndex: pageIndex,
			};

			return {
				data,
				pagination,
			};
		},
	})
	.query('count', {
		resolve: () => prismaClient.property.count({}),
	})
	.mutation('create', {
		input: Property.schema,
		resolve: async ({ input }) => {
			const { id, ...data } = input;
			return prismaClient.property.create({
				data: {
					...data,
					...(id ? { id } : {}),
				},
			});
		},
	})
	.mutation('save', {
		input: Property.schema,
		resolve: async ({ input: { id, ...data } }) => {
			const result = id
				? await prismaClient.property.update({
						data,
						where: { id },
				  })
				: await prismaClient.property.create({
						data,
				  });
			return result;
		},
	})
	.mutation('delete', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.property.delete({
				where: { id },
				select: { id: true },
			}),
	});
