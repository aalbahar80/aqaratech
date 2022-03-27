import prismaClient from '$lib/server/prismaClient';
import { groupIncome } from '$lib/utils/group';
import { strToDate } from '$lib/zodTransformers';
import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const filterSchema = z.object({
	clientId: z.string().uuid(),
	start: z.preprocess(strToDate, z.date()),
	end: z.preprocess(strToDate, z.date()),
	propertyId: z.string().uuid().nullish(),
	unitId: z.string().uuid().nullish(),
});

export default trpc.router().query('income', {
	input: filterSchema,
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
