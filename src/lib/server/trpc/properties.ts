import { paginationSchema } from '$lib/definitions/common';
import { schema } from '$lib/definitions/property';
import prismaClient from '$lib/server/prismaClient';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './router';
// import { cerbos } from '../cerbos';

export default createRouter()
	.query('read', {
		input: z.string(),
		resolve: async ({ ctx, input: id }) => {
			const data = await prismaClient.property.findUnique({
				where: {
					id,
				},
				include: {
					units: {
						include: {
							leases: {
								orderBy: {
									end: 'desc',
								},
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
			// check authz
			// const allowed = await cerbos.check({
			// 	actions: ['read'],
			// 	resource: {
			// 		kind: 'contact',
			// 		instances: {
			// 			[data.id]: {
			// 				attr: data,
			// 			},
			// 		},
			// 	},
			// 	principal: {
			// 		id: 'TODO',
			// 		roles: ['admin'],
			// 		attr: {
			// 			department: 'TODO',
			// 		},
			// 	},
			// });
			console.warn(ctx.user);
			// if (allowed.isAuthorized(data.id, 'read')) {
			if (true) {
				return data;
			} else {
				throw new TRPCError({
					// code: 'UNAUTHORIZED',
					code: 'FORBIDDEN',
				});
			}
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
		input: z.object({
			query: z.string().optional(),
			clientId: z.string().optional(),
		}),
		resolve: ({ input: { query } }) =>
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
				where: query
					? {
							OR: [
								{ id: { contains: query } },
								{ area: { contains: query } },
								{ block: { contains: query } },
								{ street: { contains: query } },
								{ avenue: { contains: query } },
								{ number: { contains: query } },
							],
					  }
					: {},
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
