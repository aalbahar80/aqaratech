import prismaClient from '$lib/server/prismaClient';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './createRouter';

export const expenses = createRouter().query('read', {
	input: z.string(),
	resolve: async ({ ctx, input: id }) => {
		const data = await prismaClient.expense.findUnique({
			where: {
				id,
			},
			include: {
				portfolio: true,
				property: true,
				unit: {
					include: {
						property: true,
					},
				},
				category: {
					include: {
						group: true,
					},
				},
			},
		});
		if (!data) {
			throw new TRPCError({ code: 'NOT_FOUND' });
		}
		if (ctx.authz.isAdmin) {
			return data;
		}
		const samePortfolio = data.portfolioId === ctx.authz.id;
		const sameProperty = data.property?.portfolioId === ctx.authz.id;
		const sameUnit = data.unit?.property?.portfolioId === ctx.authz.id;
		const allowed = samePortfolio || sameProperty || sameUnit;
		console.log({ allowed }, 'expenses.ts ~ 38');

		if (allowed) {
			return data;
		} else {
			throw new TRPCError({ code: 'FORBIDDEN' });
		}
	},
});
