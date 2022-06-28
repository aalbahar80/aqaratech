import prismaClient from '$lib/server/prismaClient';
import { paginationSchema } from '$models/common';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './createRouter';

export const properties = createRouter()
	.query('read', {
		input: z.string().uuid(),
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
			if (ctx.authz.isOwner && ctx.authz.id !== data.portfolioId) {
				throw new TRPCError({
					code: 'FORBIDDEN',
				});
			}
			// TODO: dedupe with admin:properties.read
			// sort units by unitNumber
			data.units.sort((a, b) => {
				const aa = a.unitNumber.match(/\d+/)?.[0] ?? 0;
				const bb = b.unitNumber.match(/\d+/)?.[0] ?? 0;
				return +aa - +bb;
			});
			return data;
		},
	})
	.query('list', {
		input: paginationSchema.extend({
			portfolioId: z.string().uuid(),
			query: z.string().optional(),
		}),
		resolve: async ({ input: { query, portfolioId, pageIndex, size } }) => {
			let filter = {};
			if (portfolioId) {
				filter = { portfolioId };
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
