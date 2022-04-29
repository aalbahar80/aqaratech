import type { UserConfig } from '$lib/models/interfaces/user.interface';

export const adminUser: UserConfig = {
	type: 'admin',
	navLinks: [
		{ name: 'Clients', href: '/clients' },
		{ name: 'Properties', href: '/properties' },
		{ name: 'Units', href: '/units' },
		{ name: 'Leases', href: '/leases' },
		{ name: 'Tenants', href: '/tenants' },
		// { name: 'Transactions', href: '/transactions' },
		{ name: 'Maintenance', href: '/maintenanceOrders' },
		{ name: 'Expenses', href: '/expenses' },
	],
};
