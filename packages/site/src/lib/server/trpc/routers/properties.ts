import { cerbos } from '$lib/server/cerbos';
import prismaClient from '$lib/server/prismaClient';
import { createRouter } from '$lib/server/trpc';
import { paginationSchema } from '$models/common';
import { PropertyModel } from '$models/interfaces/property.interface';
import { TRPCError } from '@trpc/server';
import * as R from 'remeda';
import { v4 } from 'uuid';
import { z } from 'zod';

export const properties = createRouter()
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
			const allowed = await cerbos.check({
				actions: ['read'],
				resource: {
					kind: 'property',
					instances: {
						[data.id]: {
							attr: data,
						},
					},
				},
				principal: {
					id: ctx.accessToken?.userMetadata?.idInternal ?? ctx.accessToken.sub!,
					roles: ctx.accessToken.roles,
				},
			});
			if (!allowed.isAuthorized(id, 'read')) {
				throw new TRPCError({ code: 'FORBIDDEN' });
			}
			return data;
		},
	})
	.query('basic', {
		input: z.string(),
		resolve: async ({ ctx, input: id }) => {
			const data = await prismaClient.property.findUnique({
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
			});

			if (!data) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Property not found',
				});
			}
			const allowed = await cerbos.check({
				actions: ['read'],
				resource: {
					kind: 'property',
					instances: {
						[data.id]: {
							attr: data,
						},
					},
				},
				principal: {
					id: ctx.accessToken?.userMetadata?.idInternal ?? ctx.accessToken.sub!,
					roles: ctx.accessToken.roles,
				},
			});
			if (!allowed.isAuthorized(id, 'read')) {
				throw new TRPCError({ code: 'FORBIDDEN' });
			}
			return data;
		},
	})
	.query('list', {
		input: paginationSchema,
		resolve: async ({ ctx, input }) => {
			const data = await prismaClient.property.findMany({
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
					clientId: true,
				},
			});
			const pagination = {
				size: input.size,
				start: input.size * (input.pageIndex - 1) + 1,
				pageIndex: input.pageIndex,
			};

			const allowed = await cerbos.check({
				actions: ['read'],
				resource: {
					kind: 'property',
					instances: R.mapToObj(data, (property) => [
						property.id,
						{ attr: property },
					]),
				},
				principal: {
					id: ctx.accessToken?.userMetadata?.idInternal ?? ctx.accessToken.sub!,
					roles: ctx.accessToken.roles,
				},
			});
			const allowedIds = R.filter(data, (property) =>
				allowed.isAuthorized(property.id, 'read'),
			);
			return {
				data: allowedIds,
				pagination,
			};
		},
	})
	.query('search', {
		input: z.object({
			query: z.string().optional(),
			clientId: z.string().uuid().optional(),
		}),
		resolve: async ({ ctx, input: { query, clientId } }) => {
			let filter = {};
			if (clientId) {
				filter = { clientId };
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
				take: 20,
				orderBy: {
					updatedAt: 'desc',
				},
				where: filter,
			});
			const principalId =
				ctx.accessToken?.userMetadata?.idInternal ?? ctx.accessToken.sub!;
			const allowed = await cerbos.check({
				actions: ['read'],
				resource: {
					kind: 'property',
					instances: R.mapToObj(data, (property) => [
						property.id,
						{ attr: property },
					]),
				},
				principal: {
					id: principalId,
					roles: ctx.accessToken.roles,
				},
			});
			const allowedIds = R.filter(data, (property) =>
				allowed.isAuthorized(property.id, 'read'),
			);
			return allowedIds;
		},
	})
	.query('count', {
		resolve: () => prismaClient.property.count({}),
	})
	.mutation('create', {
		input: PropertyModel.schema,
		resolve: async ({ ctx, input: { id, ...data } }) => {
			const resourceId = id ?? v4();
			const allowed = await cerbos.check({
				actions: ['save'],
				resource: {
					kind: 'property',
					instances: {
						[resourceId]: {
							attr: {
								...data,
							},
						},
					},
				},
				principal: {
					id: ctx.accessToken?.userMetadata?.idInternal ?? ctx.accessToken.sub!,
					roles: ctx.accessToken.roles,
				},
			});
			if (!allowed.isAuthorized(resourceId, 'save')) {
				throw new TRPCError({ code: 'FORBIDDEN' });
			}

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
	.mutation('save', {
		input: PropertyModel.schema,
		resolve: async ({ ctx, input: { id, ...data } }) => {
			const resourceId = id ?? v4();
			const allowed = await cerbos.check({
				actions: ['save'],
				resource: {
					kind: 'property',
					instances: {
						[resourceId]: {
							attr: {
								...data,
							},
						},
					},
				},
				principal: {
					id: ctx.accessToken?.userMetadata?.idInternal ?? ctx.accessToken.sub!,
					roles: ctx.accessToken.roles,
				},
			});
			if (!allowed.isAuthorized(resourceId, 'save')) {
				throw new TRPCError({ code: 'FORBIDDEN' });
			}

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
		resolve: async ({ ctx, input: id }) => {
			const property = await prismaClient.property.findUnique({
				where: { id },
				select: {
					clientId: true,
				},
			});
			if (!property) {
				throw new TRPCError({ code: 'NOT_FOUND' });
			}
			const allowed = await cerbos.check({
				actions: ['delete'],
				resource: {
					kind: 'property',
					instances: {
						[id]: {
							attr: property,
						},
					},
				},
				principal: {
					id: ctx.accessToken?.userMetadata?.idInternal ?? ctx.accessToken.sub!,
					roles: ctx.accessToken.roles,
				},
			});
			if (!allowed.isAuthorized(id, 'delete')) {
				throw new TRPCError({ code: 'FORBIDDEN' });
			}
			const deleted = await prismaClient.property.delete({
				where: {
					id,
				},
			});
			return deleted;
		},
	});
