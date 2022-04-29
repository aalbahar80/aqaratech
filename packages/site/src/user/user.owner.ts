import type { UserConfig } from '$lib/models/interfaces/user.interface';

export const ownerUser: UserConfig = {
	type: 'property-owner',
	navLinks: [
		{ name: 'Properties', href: '/properties' },
		// { name: 'Units', href: '/units' },
		{ name: 'Leases', href: '/leases' },
		// { name: 'Tenants', href: base + '/tenants' },
		// { name: 'Maintenance', href: base + '/maintenanceOrders' },
	],
};
