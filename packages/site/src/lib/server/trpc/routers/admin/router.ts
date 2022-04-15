import {
	charts,
	clients,
	leases,
	maintenanceOrders,
	properties,
	tenants,
	transactions,
	units,
} from '.';
import { createRouter } from './createRouter';

export const adminRouter = createRouter()
	.merge('properties:', properties)
	.merge('units:', units)
	.merge('charts:', charts)
	.merge('leases:', leases)
	.merge('clients:', clients)
	.merge('maintenanceOrders:', maintenanceOrders)
	.merge('transactions:', transactions)
	.merge('tenants:', tenants);
