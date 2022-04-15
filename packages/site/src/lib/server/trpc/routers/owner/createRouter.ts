import { router, TRPCError } from '@trpc/server';
import type { Context } from '../../config';

export const createRouter = () =>
	router<Context>().middleware(({ ctx, next }) => {
		if (ctx.authz?.isOwner) {
			return next({
				ctx: { authz: ctx.authz },
			});
		} else {
			throw new TRPCError({ code: 'FORBIDDEN', message: 'Forbidden' });
		}
	});
