import prismaClient from '$lib/server/prismaClient';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './createRouter';

export const transactions = createRouter()
	.query('read', {
		input: z.string(),
		resolve: async ({ ctx, input: id }) => {
			const data = await prismaClient.transaction.findUnique({
				where: {
					id,
				},
				include: {
					lease: {
						include: {
							tenant: true,
						},
					},
				},
			});
			if (!data) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Transaction not found',
				});
			}
			if (data.lease.tenantId === ctx.authz.id) {
				return data;
			} else {
				throw new TRPCError({ code: 'FORBIDDEN' });
			}
		},
	})
	.query('pay', {
		input: z.string(),
		resolve: async ({ input: id }) => {
			const data = await prismaClient.transaction.findUnique({
				where: { id },
				include: { lease: { include: { tenant: true } } },
			});
			if (!data) {
				throw new TRPCError({ code: 'NOT_FOUND' });
			}
			return data;
		},
	});
