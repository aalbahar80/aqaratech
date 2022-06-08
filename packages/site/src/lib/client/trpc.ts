import type { AppRouter } from '$lib/server/trpc';
import type { LoadEvent } from '@sveltejs/kit';
import { createTRPCClient } from '@trpc/client';
import type { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import superjson from 'superjson';

type TRPCHeaders = Parameters<typeof createTRPCClient>['0']['headers'];
const browser = typeof window != 'undefined';
export const trpc = (loadFetch?: LoadEvent['fetch'], headers?: TRPCHeaders) => {
	const url = browser ? '/trpc' : 'http://localhost:3000/trpc';
	return createTRPCClient<AppRouter>({
		url: loadFetch ? '/trpc' : url,
		transformer: superjson,
		...(loadFetch && { fetch: loadFetch }),
		...(headers && { headers }),
	});
};

type Query = keyof AppRouter['_def']['queries'];
type Mutation = keyof AppRouter['_def']['mutations'];

export type InferQueryOutput<RouteKey extends Query> = inferProcedureOutput<
	AppRouter['_def']['queries'][RouteKey]
>;
export type InferQueryInput<RouteKey extends Query> = inferProcedureInput<
	AppRouter['_def']['queries'][RouteKey]
>;
export type InferMutationOutput<RouteKey extends Mutation> =
	inferProcedureOutput<AppRouter['_def']['mutations'][RouteKey]>;
export type InferMutationInput<RouteKey extends Mutation> = inferProcedureInput<
	AppRouter['_def']['mutations'][RouteKey]
>;

export type TrpcClient = ReturnType<typeof trpc>;
