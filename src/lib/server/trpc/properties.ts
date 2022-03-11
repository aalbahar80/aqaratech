import { paginationSchema } from '$lib/definitions/common';
import { schema } from '$lib/definitions/property';
import prismaClient from '$lib/server/prismaClient';
import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export default trpc
	.router()
	.query('read', {
		input: z.string(),
		resolve: async ({ input: id }) => {
			const data = await prismaClient.property.findUnique({
				where: {
					id,
				},
				include: {
					units: {
						include: {
							leases: {
								orderBy: {
									end: 'asc',
								},
								take: 2,
							},
						},
					},
				},
			});
			if (data) return data;
			throw new TRPCError({ code: 'NOT_FOUND', message: 'Property not found' });
		},
	})
	.query('basic', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.property.findUnique({
				where: {
					id,
				},
				select: {
					id: true,
					createdAt: true,
					updatedAt: true,
					avenue: true,
					street: true,
					block: true,
					number: true,
					area: true,
					clientId: true,
					client: {
						select: {
							id: true,
							firstName: true,
							lastName: true,
						},
					},
				},
			}),
	})
	.query('list', {
		input: paginationSchema,
		resolve: async ({ input }) => ({
			data: await prismaClient.property.findMany({
				take: input.size,
				skip: input.size * (input.pageIndex - 1),
				orderBy: {
					updatedAt: 'desc',
				},
				select: {
					id: true,
					area: true,
					block: true,
					street: true,
					number: true,
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
		input: z.string().optional(),
		resolve: ({ input }) =>
			prismaClient.property.findMany({
				take: 5,
				orderBy: {
					updatedAt: 'desc',
				},
				select: {
					id: true,
					area: true,
					block: true,
					street: true,
					number: true,
					avenue: true,
				},
				where: input
					? {
							OR: [
								{ id: { contains: input } },
								{ area: { contains: input } },
								{ block: { contains: input } },
								{ street: { contains: input } },
								{ avenue: { contains: input } },
								{ number: { contains: input } },
							],
					  }
					: undefined,
			}),
	})
	.query('count', {
		resolve: () => prismaClient.property.count({}),
	})
	.mutation('save', {
		input: schema,
		resolve: ({ input: { id, ...data } }) =>
			id
				? prismaClient.property.update({
						data,
						where: { id },
				  })
				: prismaClient.property.create({
						data,
				  }),
	})
	.mutation('delete', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.property.delete({
				where: {
					id,
				},
				select: {
					id: true,
				},
			}),
	});
