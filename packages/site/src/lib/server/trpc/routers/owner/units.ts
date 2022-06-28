import prismaClient from '$lib/server/prismaClient';
import { paginationSchema } from '$models/common';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './createRouter';

export const units = createRouter()
	.query('read', {
		input: z.string(),
		resolve: async ({ ctx, input: id }) => {
			const data = await prismaClient.unit.findUnique({
				where: {
					id,
				},
				include: {
					property: true,
					leases: {
						orderBy: { start: 'desc' },
						include: { tenant: true },
					},
				},
			});
			if (!data) {
				throw new TRPCError({ code: 'NOT_FOUND' });
			}
			if (data.property.portfolioId !== ctx.authz.id) {
				throw new TRPCError({ code: 'FORBIDDEN' });
			}
			return data;
		},
	})
	.query('list', {
		input: paginationSchema
			.extend({
				portfolioId: z.string().uuid().optional(),
				propertyId: z.string().uuid().optional(),
				query: z.string().optional(),
			})
			.passthrough(),
		resolve: async ({ ctx, input: { query, pageIndex, size, propertyId } }) => {
			const samePortfolio = ctx.authz.isAdmin
				? {}
				: {
						property: {
							portfolioId: ctx.authz.id,
						},
				  };

			const propertyFilter = propertyId ? { propertyId } : {};
			const queryFilter = query
				? {
						OR: [
							{ unitNumber: { contains: query } },
							{ type: { contains: query } },
						],
				  }
				: {};
			const data = await prismaClient.unit.findMany({
				where: {
					AND: [samePortfolio, propertyFilter, queryFilter],
				},
				take: size,
				skip: size * (pageIndex - 1),
				orderBy: {
					updatedAt: 'desc',
				},
				include: {
					leases: {
						orderBy: { start: 'desc' },
					},
				},
			});
			data.sort((a, b) => {
				const aa = a.unitNumber.match(/\d+/)?.[0] ?? 0;
				const bb = b.unitNumber.match(/\d+/)?.[0] ?? 0;
				return +aa - +bb;
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
