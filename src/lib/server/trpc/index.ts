import superjson from 'superjson';
import charts from './charts';
import clients from './clients';
import leases from './leases';
import maintenanceOrders from './maintenanceOrders';
import properties from './properties';
import { createRouter } from './router';
import tenants from './tenants';
import transactions from './transactions';
import units from './units';

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
