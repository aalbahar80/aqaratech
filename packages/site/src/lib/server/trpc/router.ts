import type { Context } from '$lib/server/trpc';
import { adminRouter } from '$routers/admin';
import { ownerRouter } from '$routers/owner';
import { publicRouter } from '$routers/public';
import { tenantRouter } from '$routers/tenant';
import { router } from '@trpc/server';
import superjson from 'superjson';

export const appRouter = router<Context>()
	.transformer(superjson)
	.merge('public:', publicRouter)
	.merge('tenant:', tenantRouter)
	.merge('owner:', ownerRouter)
	.merge('', adminRouter);

export type AppRouter = typeof appRouter;
