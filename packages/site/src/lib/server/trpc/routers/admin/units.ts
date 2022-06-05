import { Unit } from '$lib/models/classes/unit.class';
import prismaClient from '$lib/server/prismaClient';
import { paginationSchema } from '$models/common';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './createRouter';

export const units = createRouter()
	.query('read', {
		input: z.string(),
		resolve: async ({ input: id }) => {
			const data = await prismaClient.unit.findUnique({
				where: {
					id,
				},
				include: {
					property: {
						include: {
							portfolio: true,
						},
					},
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
					property: {
						include: {
							portfolio: true,
						},
					},
				},
			});
			if (data) return data;
			throw new TRPCError({ code: 'NOT_FOUND' });
		},
	})
	.query('list', {
		input: paginationSchema.extend({
			portfolioId: z.string().uuid().optional(),
			propertyId: z.string().uuid().optional(),
			query: z.string().optional(),
		}),
		resolve: async ({ input: { query, pageIndex, size, propertyId } }) => {
			const propertyFilter = propertyId ? { propertyId } : {};
			const queryFilter = query
				? {
						OR: [
							{ unitNumber: { contains: query } },
							{ type: { contains: query } },
						],
				  }
				: {};
			const data = await prismaClient.unit.findMany({
				where: {
					AND: [propertyFilter, queryFilter],
				},
				take: size,
				skip: size * (pageIndex - 1),
				orderBy: {
					updatedAt: 'desc',
				},
				include: {
					leases: {
						orderBy: { start: 'desc' },
					},
				},
			});
			const pagination = {
				size: size,
				start: size * (pageIndex - 1) + 1,
				pageIndex: pageIndex,
			};
			if (data) {
				return { data, pagination };
			} else {
				throw new TRPCError({ code: 'NOT_FOUND' });
			}
		},
	})
	.query('count', {
		resolve: () => prismaClient.unit.count({}),
	})
	.mutation('create', {
		input: Unit.schema,
		resolve: async ({ input }) => {
			const { id, ...data } = input;
			return prismaClient.unit.create({
				data: {
					...data,
					...(id ? { id } : {}),
				},
			});
		},
	})
	.mutation('save', {
		input: Unit.schema,
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
