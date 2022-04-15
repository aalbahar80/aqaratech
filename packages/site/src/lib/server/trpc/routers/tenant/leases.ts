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
			where: { tenantId: id },
			orderBy: {
				start: 'desc',
			},
			include: {
				transactions: {
					orderBy: {
						postDate: 'desc',
					},
					select: {
						id: true,
						amount: true,
						isPaid: true,
						memo: true,
						receiptUrl: true,
						dueDate: true,
						postDate: true,
					},
				},
			},
		});
		return data;
	},
});
