import { createRouter } from './createRouter';
import { charts } from './charts';
import { clients } from './clients';
import { leases } from './leases';
import { maintenanceOrders } from './maintenanceOrders';
import { properties } from './properties';
import { tenants } from './tenants';
import { transactions } from './transactions';
import { units } from './units';

export const adminRouter = createRouter()
	.merge('units:', units)
	.merge('charts:', charts)
	.merge('leases:', leases)
	.merge('clients:', clients)
	.merge('maintenanceOrders:', maintenanceOrders)
	.merge('transactions:', transactions)
	.merge('tenants:', tenants)
	.merge('properties:', properties);
