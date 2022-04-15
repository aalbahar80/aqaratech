import prismaClient from '$lib/server/prismaClient';
import { paginationSchema } from '$models/common';
import { PropertyModel } from '$models/interfaces/property.interface';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '.';

export const properties = createRouter()
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
		input: paginationSchema,
		resolve: async ({ input }) => {
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

			return {
				data,
				pagination,
			};
		},
	})
	.query('search', {
		input: z.object({
			query: z.string().optional(),
			clientId: z.string().uuid().optional(),
		}),
		resolve: async ({ input: { query, clientId } }) => {
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
			return data;
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
