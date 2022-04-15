import { router, TRPCError } from '@trpc/server';
import { charts, properties, units } from '.';
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

export const ownerRouter = createRouter()
	.merge('properties:', properties)
	.merge('units:', units)
	.merge('charts:', charts);
