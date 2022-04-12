import prismaClient from '$lib/server/prismaClient';
import { createRouter } from '$lib/server/trpc';
import { paginationSchema } from '$models/common';
import { UnitModel } from '$models/interfaces/unit.interface';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const units = createRouter()
	.query('read', {
		input: z.string(),
		resolve: async ({ input: id }) => {
			const data = await prismaClient.unit.findUnique({
				where: {
					id,
				},
				include: {
					property: true,
					leases: {
						orderBy: { start: 'desc' },
						include: { tenant: true },
					},
				},
			});
			if (data) return data;
			throw new TRPCError({ code: 'NOT_FOUND', message: 'Unit not found' });
		},
	})
	.query('basic', {
		input: z.string(),
		resolve: async ({ input: id }) => {
			const data = await prismaClient.unit.findUnique({
				where: {
					id,
				},
				include: {
					property: true,
				},
			});
			if (data) return data;
			throw new TRPCError({ code: 'NOT_FOUND' });
		},
	})
	.query('list', {
		input: paginationSchema,
		resolve: async ({ input }) => {
			const data = await prismaClient.unit.findMany({
				take: input.size,
				skip: input.size * (input.pageIndex - 1),
				orderBy: {
					updatedAt: 'desc',
				},
				select: {
					id: true,
					unitNumber: true,
					type: true,
					marketRent: true,
					bed: true,
					bath: true,
				},
			});
			const pagination = {
				size: input.size,
				start: input.size * (input.pageIndex - 1) + 1,
				pageIndex: input.pageIndex,
			};
			return {
				data,
				pagination,
			};
		},
	})
	.query('search', {
		input: z.object({
			query: z.string().optional(),
			propertyId: z.string().uuid().optional(),
		}),
		resolve: async ({ input: { query, propertyId } }) => {
			let filter = {};
			if (propertyId) {
				filter = { propertyId };
			} else if (query) {
				filter = {
					OR: [
						{ unitNumber: { contains: query } },
						{ type: { contains: query } },
					],
				};
			}
			const data = await prismaClient.unit.findMany({
				take: 20,
				orderBy: {
					updatedAt: 'desc',
				},
				select: {
					id: true,
					unitNumber: true,
					type: true,
				},
				where: filter,
			});
			return data;
		},
	})
	.query('count', {
		resolve: () => prismaClient.unit.count({}),
	})
	.mutation('create', {
		input: UnitModel.schema,
		resolve: ({ input: { id, ...data } }) =>
			id
				? prismaClient.unit.update({
						data,
						where: { id },
				  })
				: prismaClient.unit.create({
						data,
				  }),
	})
	.mutation('save', {
		input: UnitModel.schema,
		resolve: ({ input: { id, ...data } }) =>
			id
				? prismaClient.unit.update({
						data,
						where: { id },
				  })
				: prismaClient.unit.create({
						data,
				  }),
	})
	.mutation('delete', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.unit.delete({
				where: {
					id,
				},
				select: {
					id: true,
				},
			}),
	});
