import prismaClient from '$lib/server/prismaClient';
import { createRouter } from '$lib/server/trpc';
import { paginationSchema } from '$models/common';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import type { OwnerRouterBase } from '../../router';

const ownerRouter = createRouter() as OwnerRouterBase;
export const units = ownerRouter
	.query('read', {
		input: z.string(),
		resolve: async ({ ctx, input: id }) => {
			console.log({ ctx }, 'units.ts ~ 13');
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
			if (data.property.clientId !== ctx.accessToken.id) {
				throw new TRPCError({ code: 'FORBIDDEN' });
			}
			return data;
		},
	})
	.query('list', {
		input: paginationSchema.extend({
			propertyId: z.string().uuid().optional(),
			query: z.string().optional(),
		}),
		resolve: async ({ ctx, input: { query, pageIndex, size, propertyId } }) => {
			const sameClient = {
				property: {
					clientId: ctx.accessToken.id,
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
					AND: [sameClient, propertyFilter, queryFilter],
				},
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
