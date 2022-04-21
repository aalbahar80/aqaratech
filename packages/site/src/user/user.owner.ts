import type { UserConfig } from '$lib/models/interfaces/user.interface';

// export const ownerUser: UserConfig = {
// 	type: 'property-owner',
// 	navLinks: [
// 		{ name: 'Properties', href: base + '/properties' },
// 		{ name: 'Units', href: base + '/units' },
// 		{ name: 'Leases', href: base + '/leases' },
// 		// { name: 'Tenants', href: base + '/tenants' },
// 		// { name: 'Maintenance', href: base + '/maintenanceOrders' },
// 	],
// };

export const getOwnerUser = (id: string): UserConfig => {
	const base = `/portal/owner/${id}`;
	return {
		type: 'property-owner',
		navLinks: [
			{ name: 'Properties', href: base + '/properties' },
			{ name: 'Units', href: base + '/units' },
			{ name: 'Leases', href: base + '/leases' },
			// { name: 'Tenants', href: base + '/tenants' },
			// { name: 'Maintenance', href: base + '/maintenanceOrders' },
		],
	};
};
