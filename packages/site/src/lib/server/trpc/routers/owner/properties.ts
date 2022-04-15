import prismaClient from '$lib/server/prismaClient';
import { createRouter } from '.';
import { paginationSchema } from '$models/common';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const properties = createRouter()
	// TODO check propertyId belongs to the user
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
	.query('list', {
		input: paginationSchema.extend({
			clientId: z.string().uuid(),
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
	});
