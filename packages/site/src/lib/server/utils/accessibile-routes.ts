import type { User } from '$lib/models/types/auth.type';

export const ACCESSIBLE_ROUTES = {
	AUTHENTICATED: [
		// routes for any authenticated user
		'/users', // role selection
		'/welcome',
		'/organizations/new',
	],
	ORGADMIN: [
		'/organizations',
		'/tenants',
		'/portfolios',
		'/properties',
		'/units',
		'/leases',
		'/expenses',
		'/leaseInvoices',
		'/maintenanceOrders',
		'/files',
	],
	PORTFOLIO: [
		'/tenants',
		'/portfolios',
		'/properties',
		'/units',
		'/leases',
		'/expenses',
		'/leaseInvoices',
		'/maintenanceOrders',
	],
	TENANT: [
		'/leases',
		'/expenses',
		'/leaseInvoices',
		'/maintenanceOrders',
		'/portal/tenant', // change to /tenant/dashboard
	],
};

export const isAccessible = ({
	user,
	pathname,
}: {
	user: User;
	pathname: string;
}) => {
	if (
		ACCESSIBLE_ROUTES.AUTHENTICATED.some((route) => pathname.startsWith(route))
	) {
		return true;
	}

	if (user.role?.roleType === 'ORGADMIN') {
		return ACCESSIBLE_ROUTES.ORGADMIN.some((route) =>
			pathname.startsWith(route),
		);
	} else if (user.role?.roleType === 'PORTFOLIO') {
		return ACCESSIBLE_ROUTES.PORTFOLIO.some((route) =>
			pathname.startsWith(route),
		);
	} else if (user.role?.roleType === 'TENANT') {
		return ACCESSIBLE_ROUTES.TENANT.some((route) => pathname.startsWith(route));
	} else {
		return false;
	}
};
