import * as trpc from '@trpc/server';
import superjson from 'superjson';
import charts from './charts';
import clients from './clients';
import leases from './leases';
import maintenanceOrders from './maintenanceOrders';
import properties from './properties';
import tenants from './tenants';
import transactions from './transactions';
import units from './units';

export const createContext = (req: Request) => {
	console.log(req);
	const user = 'this is user';
	return { user };
};
export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => {
	return trpc.router<Context>();
};

export const router = createRouter()
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
