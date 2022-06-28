import type { Context } from '$lib/server/trpc';
import { router, TRPCError } from '@trpc/server';

export const createRouter = () =>
	router<Context>().middleware(({ ctx, next }) => {
		if (ctx.authz?.isAdmin) {
			return next({
				ctx: { authz: ctx.authz },
			});
		} else {
			throw new TRPCError({ code: 'FORBIDDEN', message: 'Forbidden' });
		}
	});
