import { schema } from '$lib/definitions/client';
import { paginationSchema } from '$lib/definitions/common';
import prismaClient from '$lib/server/prismaClient';
import * as trpc from '@trpc/server';
import { z } from 'zod';

export default trpc
	.router()
	.query('read', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.client.findUnique({
				where: {
					id,
				},
			}),
	})
	.query('basic', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.client.findUnique({
				where: {
					id,
				},
				select: {
					id: true,
					createdAt: true,
					updatedAt: true,
					firstName: true,
					lastName: true,
					phone: true,
					email: true,
					civilid: true,
				},
			}),
	})
	.query('list', {
		input: paginationSchema,
		resolve: async ({ input }) => ({
			data: await prismaClient.client.findMany({
				take: input.size,
				skip: input.size * (input.pageIndex - 1),
				orderBy: {
					updatedAt: 'desc',
				},
				select: {
					id: true,
					firstName: true,
					lastName: true,
					phone: true,
					email: true,
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
			prismaClient.client.findMany({
				take: 5,
				orderBy: {
					updatedAt: 'desc',
				},
				select: {
					id: true,
					firstName: true,
					lastName: true,
				},
				where: input
					? {
							OR: [
								{ id: { contains: input } },
								{ firstName: { contains: input } },
								{ secondName: { contains: input } },
								{ thirdName: { contains: input } },
								{ lastName: { contains: input } },
								{ email: { contains: input } },
								{ phone: { contains: input } },
								{ civilid: { contains: input } },
							],
					  }
					: undefined,
			}),
	})
	.query('count', {
		resolve: () => prismaClient.client.count({}),
	})
	.mutation('save', {
		input: schema,
		resolve: ({ input: { id, ...data } }) =>
			id
				? prismaClient.client.update({
						data,
						where: { id },
				  })
				: prismaClient.client.create({
						data,
				  }),
	})
	.mutation('delete', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.client.delete({
				where: {
					id,
				},
				select: {
					id: true,
				},
			}),
	});
