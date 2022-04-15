import { createRouter } from '$lib/server/trpc';
import { TRPCError } from '@trpc/server';
import { charts, properties, units } from '.';

const baseRouter = createRouter().middleware(({ ctx, next }) => {
	if (ctx.accessToken.isOwner) {
		const accessToken = {
			...ctx.accessToken,
			isAdmin: false,
			isOwner: true,
			id: ctx.accessToken.userMetadata.idInternal,
		};
		return next({
			ctx: {
				...ctx,
				accessToken,
			},
		});
	}
	throw new TRPCError({ code: 'FORBIDDEN', message: 'Forbidden' });
});

export const router = baseRouter
	.merge('properties:', properties)
	.merge('units:', units)
	.merge('charts:', charts);

export type BaseRouter = typeof baseRouter;
