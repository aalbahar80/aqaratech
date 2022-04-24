import type { AppRouter } from '$lib/server/trpc';
import * as trpc from '@trpc/client';
import type { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import superjson from 'superjson';

const client = trpc.createTRPCClient<AppRouter>({
	url: '/trpc',
	transformer: superjson,
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

export default client;
export type TrpcClient = typeof client;
