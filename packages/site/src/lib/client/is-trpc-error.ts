import type { AppRouter } from '$lib/server/trpc/router';
import { TRPCClientError } from '@trpc/client';

export function isTRPCError(e: unknown): e is TRPCClientError<AppRouter> {
	return e instanceof TRPCClientError;
}
