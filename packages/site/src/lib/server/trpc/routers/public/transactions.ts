import prismaClient from '$lib/server/prismaClient';
import { router, TRPCError } from '@trpc/server';
import { z } from 'zod';

export const transactions = router().query('read', {
	input: z.string(),
	resolve: async ({ input: id }) => {
		const data = await prismaClient.transaction.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				amount: true,
				memo: true,
				dueAt: true,
				isPaid: true,
				postAt: true,
				leaseId: true,
				paidAt: true,
				lease: {
					select: {
						deactivated: true,
						unit: {
							select: {
								type: true,
								unitNumber: true,
								property: {
									select: {
										area: true,
										avenue: true,
										block: true,
										street: true,
										number: true,
									},
								},
							},
						},
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
});
