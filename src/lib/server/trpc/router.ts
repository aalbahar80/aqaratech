import type { createTRPCHandle } from '$lib/server/trpc';
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
import { appAuth } from '$lib/services/auth';
import type { RequestEvent } from '@sveltejs/kit/types/private';
import { router as trpcRouter, type inferAsyncReturnType } from '@trpc/server';
import superjson from 'superjson';

type TRPCHandler = Parameters<typeof createTRPCHandle>;
type CreateContextFn = NonNullable<TRPCHandler[0]['createContext']>;
type ResponseMetaFn = NonNullable<TRPCHandler[0]['responseMeta']>;

export const createContext = async (event: RequestEvent) => {
	const token = await appAuth.getToken(event.request.headers);
	return {
		user: token?.user,
	};
};
export type Context = inferAsyncReturnType<typeof createContext>;
export const createRouter = () => {
	return trpcRouter<Context>();
};

export const responseMeta: ResponseMetaFn = ({ type, errors, paths }) => {
	console.log(paths, 'router.ts ~ 23');
	const charts = paths?.every((path) => path.startsWith('charts'));
	console.log({ charts }, 'router.ts ~ 25');
	if (type === 'query' && errors.length === 0 && charts) {
		console.log('caching');
		const duration = 60 * 10;
		return {
			headers: {
				'cache-control': `max-age=10, stale-while-revalidate=${duration}, private`,
			},
		};
	} else {
		return {};
	}
};

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
