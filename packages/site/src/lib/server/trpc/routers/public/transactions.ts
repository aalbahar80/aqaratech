import prismaClient from '$lib/server/prismaClient';
import { router, TRPCError } from '@trpc/server';
import { z } from 'zod';

// TODO ensure these endpoints return minimal data.
// Use tenant: transactions to return any privilieged data.
export const transactions = router()
	.query('read', {
		input: z.string(),
		resolve: async ({ input: id }) => {
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
			return data;
		},
	})
	.query('pay', {
		// TODO use this endpoint
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
