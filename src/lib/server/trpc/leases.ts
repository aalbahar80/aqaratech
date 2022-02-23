import { paginationSchema } from '$lib/definitions/common';
import { schema } from '$lib/definitions/lease';
import prismaClient from '$lib/server/prismaClient';
import * as trpc from '@trpc/server';
import { z } from 'zod';

export default trpc
	.router()
	.query('read', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.lease.findUnique({
				where: {
					id,
				},
			}),
	})
	.query('basic', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.lease.findUnique({
				where: {
					id,
				},
				select: {
					id: true,
					monthlyRent: true,
					deposit: true,
					startDate: true,
					endDate: true,
					createdAt: true,
					updatedAt: true,
					tenantId: true,
					tenant: {
						select: {
							id: true,
							firstName: true,
							lastName: true,
						},
					},
					unitId: true,
					unit: {
						select: {
							id: true,
							unitNumber: true,
						},
					},
				},
			}),
	})
	.query('list', {
		input: paginationSchema,
		resolve: async ({ input }) => ({
			data: await prismaClient.lease.findMany({
				take: input.size,
				skip: input.size * (input.pageIndex - 1),
				orderBy: {
					updatedAt: 'desc',
				},
				select: {
					id: true,
					startDate: true,
					endDate: true,
					monthlyRent: true,
				},
			}),
			pagination: {
				size: input.size,
				start: input.size * (input.pageIndex - 1) + 1,
				pageIndex: input.pageIndex,
			},
		}),
	})
	.query('count', {
		resolve: () => prismaClient.lease.count({}),
	})
	.mutation('save', {
		input: schema,
		resolve: ({ input: { id, ...data } }) =>
			id
				? prismaClient.lease.update({
						data,
						where: { id },
						// select: { id: true },
				  })
				: prismaClient.lease.create({
						data,
						// select: { id: true },
				  }),
	})
	.mutation('delete', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.lease.delete({
				where: {
					id,
				},
			}),
	});
