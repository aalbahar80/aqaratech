import { browser, dev } from '$app/env';
import type { Router } from '$lib/server/trpc';
import * as trpc from '@trpc/client';
import type { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import superjson from 'superjson';

let url: string;

if (browser) {
	url = '/trpc';
} else if (dev) {
	url = 'http://localhost:3000/trpc';
} else if (process.env.VERCEL && process.env.VERCEL_URL) {
	url = `https://${process.env.VERCEL_URL}/trpc`;
} else {
	const message = 'Could not determine trpc url, assuming localhost';
	console.warn(message);
	url = 'http://localhost:3000/trpc';
}

const client = (loadFetch?: typeof fetch) =>
	trpc.createTRPCClient<Router>({
		url: loadFetch ? '/trpc' : url,
		transformer: superjson,
		...(loadFetch && { fetch: loadFetch }),
	});

type Query = keyof Router['_def']['queries'];
type Mutation = keyof Router['_def']['mutations'];

export type InferQueryOutput<RouteKey extends Query> = inferProcedureOutput<
	Router['_def']['queries'][RouteKey]
>;
export type InferQueryInput<RouteKey extends Query> = inferProcedureInput<
	Router['_def']['queries'][RouteKey]
>;
export type InferMutationOutput<RouteKey extends Mutation> =
	inferProcedureOutput<Router['_def']['mutations'][RouteKey]>;
export type InferMutationInput<RouteKey extends Mutation> = inferProcedureInput<
	Router['_def']['mutations'][RouteKey]
>;

export default client;
