import { paginationSchema } from '$lib/definitions/common';
import { schema } from '$lib/definitions/property';
import prismaClient from '$lib/server/prismaClient';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '$lib/server/trpc';
import { cerbos } from '$lib/server/cerbos';

export const properties = createRouter()
	.middleware(async ({ next, rawInput, ctx }) => {
		const idSchema = z
			.string()
			.uuid()
			.or(z.object({ id: z.string().uuid() }));
		// TODO move to end of router chain?
		const result = idSchema.safeParse(rawInput);
		if (!result.success) {
			// TODO :create should be an exception, use new trpc feature: route metadata?
			throw new TRPCError({
				code: 'PRECONDITION_FAILED',
				message: 'No property id passed',
			});
		}
		let id = '';
		if (typeof result.data === 'string') {
			id = result.data;
		} else {
			id = result.data.id;
		}

		const allowed = await cerbos.check({
			actions: ['read'],
			resource: {
				kind: 'property',
				instances: {
					[id]: {},
				},
			},
			principal: {
				id: ctx.accessToken?.userMetadata?.idInternal ?? ctx.accessToken.sub!,
				roles: ctx.accessToken.roles,
			},
		});
		if (allowed.isAuthorized(id, 'read')) {
			// TODO return allowed.isAuthorized(id, 'read')?
			return next({ ctx });
		} else {
			throw new TRPCError({
				code: 'FORBIDDEN',
			});
		}
	})
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
			return data;
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
