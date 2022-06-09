import prismaClient from '$lib/server/prismaClient';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './createRouter';

export const transactions = createRouter().query('read', {
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
						unit: {
							include: {
								property: true,
							},
						},
					},
				},
			},
		});
		if (!data) throw new TRPCError({ code: 'NOT_FOUND' });
		if (ctx.authz.isAdmin) return data;

		const allowed = ctx.authz.id === data.lease.unit.property.portfolioId;
		if (allowed) return data;

		throw new TRPCError({ code: 'FORBIDDEN' });
	},
});
