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
import {
	properties as propertiesOwner,
	units as unitsOwner,
} from '$lib/server/trpc/routers/owner';
import { TRPCError } from '@trpc/server';
import superjson from 'superjson';

const adminRouter = createRouter()
	.middleware(({ ctx, next }) => {
		console.log({ ctx }, 'router.ts ~ 21');
		if (ctx.accessToken.isAdmin) {
			return next({
				ctx: { ...ctx },
			});
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

const ownerRouterBase = createRouter().middleware(({ ctx, next }) => {
	if (ctx.accessToken.isOwner) {
		return next({
			ctx: { ...ctx, accessToken: { ...ctx.accessToken, isOwner: true } },
		});
	}
	throw new TRPCError({ code: 'FORBIDDEN', message: 'Forbidden' });
});

const ownerRouter = ownerRouterBase
	.merge('properties:', propertiesOwner)
	.merge('units:', unitsOwner);

export const router = createRouter()
	.transformer(superjson)
	.merge('owner:', ownerRouter)
	.merge('charts:', charts)
	.merge('', adminRouter);

export type Router = typeof router;
export type OwnerRouterBase = typeof ownerRouterBase;
