import { browser } from '$app/env';
import type { AppRouter } from '$lib/server/trpc';
import { createTRPCClient } from '@trpc/client';
import type { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import superjson from 'superjson';

const url = browser ? '/trpc' : 'http://localhost:3000/trpc';
export const trpc = (loadFetch?: typeof fetch) =>
	createTRPCClient<AppRouter>({
		url: loadFetch ? '/trpc' : url,
		transformer: superjson,
		...(loadFetch && { fetch: loadFetch }),
	});

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
