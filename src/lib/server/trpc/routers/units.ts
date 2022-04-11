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
		resolve: async ({ input }) => ({
			data: await prismaClient.unit.findMany({
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
			}),
			pagination: {
				size: input.size,
				start: input.size * (input.pageIndex - 1) + 1,
				pageIndex: input.pageIndex,
			},
		}),
	})
	.query('search', {
		input: z.object({
			query: z.string().optional(),
			propertyId: z.string().nullish(),
		}),
		resolve: ({ input }) =>
			prismaClient.unit.findMany({
				take: 5,
				orderBy: {
					updatedAt: 'desc',
				},
				select: {
					id: true,
					unitNumber: true,
					type: true,
				},
				where:
					input.query || input.propertyId
						? {
								AND: [
									{
										propertyId: input.propertyId ?? {},
									},
									{
										OR: input.query
											? [
													{ id: { contains: input.query } },
													{ unitNumber: { contains: input.query } },
											  ]
											: {},
									},
								],
						  }
						: {},
			}),
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
