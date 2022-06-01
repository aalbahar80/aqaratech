import type { Context } from '$lib/server/trpc';
import { adminRouter } from '$routers/admin';
import { ownerRouter } from '$routers/owner';
import { publicRouter } from '$routers/public';
import { tenantRouter } from '$routers/tenant';
import { Prisma } from '@prisma/client';
import { router, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

export const appRouter = router<Context>()
	.transformer(superjson)
	.merge('public:', publicRouter)
	.merge('tenant:', tenantRouter)
	.merge('owner:', ownerRouter)
	.merge('', adminRouter)
	.formatError(({ shape, error }) => {
		return {
			...shape,
			data: {
				...shape.data,
				zodError: getZodError(error),
				prismaError: getPrismaError(error),
			},
		};
	});

export type AppRouter = typeof appRouter;

function getPrismaError(error: TRPCError) {
	if (error.cause instanceof Prisma.PrismaClientKnownRequestError) {
		return { ...error.cause };
	}
	return;
}

function getZodError(error: TRPCError) {
	return error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
		? error.cause.flatten()
		: null;
}
