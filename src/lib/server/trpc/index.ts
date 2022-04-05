import type { AnyRouter, inferAsyncReturnType } from '@trpc/server';
import * as trpc from '@trpc/server';
import superjson from 'superjson';
import type { CreateContextFn } from 'trpc-sveltekit/dist/types';
import charts from './charts';
import clients from './clients';
import leases from './leases';
import maintenanceOrders from './maintenanceOrders';
import properties from './properties';
import tenants from './tenants';
import transactions from './transactions';
import units from './units';

export const createContext = (req) => {
	// export const createContext = (req) => {
	console.log(req);
	const user = 'this is user';
	return { user };
};

export const router = trpc
	.router<inferAsyncReturnType<typeof createContext>>()
	.transformer(superjson)
	.merge('tenants:', tenants)
	.merge('leases:', leases)
	.merge('units:', units)
	.merge('properties:', properties)
	.merge('clients:', clients)
	.merge('transactions:', transactions)
	.merge('maintenanceOrders:', maintenanceOrders)
	.merge('charts:', charts);

export type Router = typeof router;
