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
import { TRPCError } from '@trpc/server';
import superjson from 'superjson';

export const adminRouter = createRouter()
	.middleware(({ ctx, next }) => {
		if (ctx.accessToken.roles.includes('admin')) {
			return next();
		}
		throw new TRPCError({ code: 'FORBIDDEN', message: 'Forbidden' });
	})
	.merge('clients:', clients)
	.merge('properties:', properties)
	.merge('units:', units)
	.merge('leases:', leases)
	.merge('transactions:', transactions)
	.merge('tenants:', tenants)
	.merge('maintenanceOrders:', maintenanceOrders);

export const router = createRouter()
	.transformer(superjson)
	.merge('charts:', charts)
	.merge('', adminRouter);

export type Router = typeof router;
