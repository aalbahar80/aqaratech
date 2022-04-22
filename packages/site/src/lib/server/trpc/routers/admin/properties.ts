import prismaClient from '$lib/server/prismaClient';
import { paginationSchema } from '$models/common';
import { PropertyModel } from '$models/interfaces/property.interface';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './createRouter';

export const properties = createRouter()
	.query('read', {
		input: z.string().uuid(),
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
		resolve: async ({ input: id }) => {
			const data = await prismaClient.property.findUnique({
				where: {
					id,
				},
				include: {
					client: true,
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
	.query('list', {
		input: paginationSchema.extend({
			clientId: z.string().uuid().optional(),
			query: z.string().optional(),
		}),
		resolve: async ({ input: { query, clientId, pageIndex, size } }) => {
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
				where: filter,
				take: size,
				skip: size * (pageIndex - 1),
				orderBy: {
					updatedAt: 'desc',
				},
			});
			const pagination = {
				size: size,
				start: size * (pageIndex - 1) + 1,
				pageIndex: pageIndex,
			};

			return {
				data,
				pagination,
			};
		},
	})
	.query('count', {
		resolve: () => prismaClient.property.count({}),
	})
	.mutation('create', {
		input: PropertyModel.schema,
		resolve: async ({ input: { id, ...data } }) => {
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
		resolve: async ({ input: { id, ...data } }) => {
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
		resolve: async ({ input: id }) => {
			const property = await prismaClient.property.findUnique({
				where: { id },
				select: {
					clientId: true,
				},
			});
			if (!property) {
				throw new TRPCError({ code: 'NOT_FOUND' });
			}
			const deleted = await prismaClient.property.delete({
				where: {
					id,
				},
			});
			return deleted;
		},
	});
