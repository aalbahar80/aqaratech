import type { inferAsyncReturnType } from '@trpc/server';
import * as trpc from '@trpc/server';
import superjson from 'superjson';
import tenants from './tenants';
import leases from './leases';

export const createContext = () => ({});

export const router = trpc
	.router<inferAsyncReturnType<typeof createContext>>()
	.transformer(superjson)
	.merge('tenants:', tenants)
	.merge('leases:', leases);

export type Router = typeof router;
