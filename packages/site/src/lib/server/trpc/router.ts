import type { Context } from '$lib/server/trpc';
// import { adminRouter } from '$routers/admin';
//
import { ownerRouter } from '$routers/owner';
import { router } from '@trpc/server';
import superjson from 'superjson';
import { adminRouter } from './routers/admin/router';

export const appRouter = router<Context>()
	.transformer(superjson)
	// .merge('owner:', ownerRouter)
	.merge('', adminRouter);

export type AppRouter = typeof appRouter;
