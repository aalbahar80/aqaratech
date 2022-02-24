import type { inferAsyncReturnType } from '@trpc/server';
import * as trpc from '@trpc/server';
import superjson from 'superjson';
import clients from './clients';
import leases from './leases';
import properties from './properties';
import tenants from './tenants';
import units from './units';

export const createContext = () => ({});

export const router = trpc
	.router<inferAsyncReturnType<typeof createContext>>()
	.transformer(superjson)
	.merge('tenants:', tenants)
	.merge('leases:', leases)
	.merge('units:', units)
	.merge('properties:', properties)
	.merge('clients:', clients);

export type Router = typeof router;
