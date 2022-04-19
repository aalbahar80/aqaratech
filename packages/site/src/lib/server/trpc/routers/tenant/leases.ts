import prismaClient from '$lib/server/prismaClient';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './createRouter';

export const leases = createRouter().query('list', {
	input: z.string().uuid(),
	resolve: async ({ ctx, input: id }) => {
		if (ctx.authz.id !== id) {
			throw new TRPCError({ code: 'FORBIDDEN' });
		}
		const data = await prismaClient.lease.findMany({
			where: {
				AND: [{ tenantId: id }, { start: { lte: new Date() } }],
			},
			orderBy: {
				start: 'desc',
			},
			include: {
				transactions: {
					where: { postAt: { lte: new Date() } },
					orderBy: {
						postAt: 'desc',
					},
					select: {
						// TODO only return necessary data
						id: true,
						amount: true,
						isPaid: true,
						memo: true,
						dueAt: true,
						postAt: true,
						paidAt: true,
						mfPaymentId: true,
					},
				},
			},
		});
		return data;
	},
});
