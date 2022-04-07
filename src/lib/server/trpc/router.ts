import { createRouter } from '$lib/server/trpc';
import {
	charts,
	clients,
	leases,
	maintenanceOrders,
	properties,
	tenants,
	transactions,
	units,
} from '$lib/server/trpc/routers';
import superjson from 'superjson';

export const router = createRouter()
	.transformer(superjson)
	.merge('clients:', clients)
	.merge('properties:', properties)
	.merge('units:', units)
	.merge('leases:', leases)
	.merge('transactions:', transactions)
	.merge('tenants:', tenants)
	.merge('maintenanceOrders:', maintenanceOrders)
	.merge('charts:', charts);

export type Router = typeof router;
