import { paginationSchema } from '$lib/definitions/common';
import { schema } from '$lib/definitions/unit';
import prismaClient from '$lib/server/prismaClient';
import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export default trpc
	.router()
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
						include: {
							tenant: true,
						},
					},
				},
			});
			if (data) return data;
			throw new TRPCError({ code: 'NOT_FOUND', message: 'Unit not found' });
		},
	})
	.query('basic', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.unit.findUnique({
				where: {
					id,
				},
				include: {
					property: true,
				},
			}),
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
				},
				where:
					input.query || input.propertyId
						? {
								AND: [
									{
										propertyId: input.propertyId ?? {},
									},
									{
										OR: [
											{ id: { contains: input.query } },
											{ unitNumber: { contains: input.query } },
										],
									},
								],
						  }
						: undefined,
			}),
		// 	where: input
		// 		? {
		// 				OR: [
		// 					{ id: { contains: input.query } },
		// 					{ unitNumber: { contains: input.query } },
		// 				],
		// 		  }
		// 		: undefined,
		// }),
	})
	.query('count', {
		resolve: () => prismaClient.unit.count({}),
	})
	.mutation('save', {
		input: schema,
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
