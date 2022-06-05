import type { UserConfig } from '$lib/models/interfaces/user.interface';

export const adminUser: UserConfig = {
	type: 'admin',
	navLinks: [
		{ name: 'Portfolios', href: '/portfolios' },
		{ name: 'Properties', href: '/properties' },
		// { name: 'Units', href: '/units' },
		{ name: 'Leases', href: '/leases' },
		{ name: 'Tenants', href: '/tenants' },
		// { name: 'Transactions', href: '/transactions' },
		{ name: 'Expenses', href: '/expenses' },
		{ name: 'Maintenance', href: '/maintenanceOrders' },
	],
};
