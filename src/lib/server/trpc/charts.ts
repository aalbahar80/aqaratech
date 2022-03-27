import prismaClient from '$lib/server/prismaClient';
import { groupIncome } from '$lib/utils/group';
import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export default trpc.router().query('income', {
	input: z.object({
		clientId: z.string().uuid(),
		start: z.date(),
		end: z.date(),
		propertyId: z.string().uuid().optional(),
		unitId: z.string().uuid().optional(),
	}),
	resolve: async ({ input: { end, start, propertyId, clientId } }) => {
		const data = await prismaClient.transaction.findMany({
			where: {
				postDate: {
					gte: start,
					lte: end,
				},
				lease: {
					unit: propertyId
						? {
								propertyId,
						  }
						: {
								property: {
									clientId,
								},
						  },
				},
			},
			select: {
				postDate: true,
				amount: true,
				isPaid: true,
			},
			orderBy: {
				postDate: 'asc',
			},
		});
		if (data)
			return groupIncome(
				data.map((item) => ({ ...item, date: item.postDate })),
			);
		throw new TRPCError({ code: 'NOT_FOUND', message: 'Unable to get data' });
	},
});
