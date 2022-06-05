import { portfolios } from './portfolios';
import { createRouter } from './createRouter';
import { expenseMeta } from './expenseMeta';
import { expenses } from './expenses';
import { leases } from './leases';
import { maintenanceOrders } from './maintenanceOrders';
import { properties } from './properties';
import { tenants } from './tenants';
import { transactions } from './transactions';
import { units } from './units';

export const adminRouter = createRouter()
	.merge('units:', units)
	.merge('leases:', leases)
	.merge('portfolios:', portfolios)
	.merge('maintenanceOrders:', maintenanceOrders)
	.merge('transactions:', transactions)
	.merge('tenants:', tenants)
	.merge('expenses:', expenses)
	.merge('properties:', properties)
	.merge('expenseMeta:', expenseMeta);
