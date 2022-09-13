import type { User } from '$lib/models/types/auth.type';

export const ACCESSIBLE_ROUTES = {
	AUTHENTICATED: [
		// routes for any authenticated user
		'/users', // role selection
		'/welcome',
		'/organizations/new',
	],
	STAFF: ['/admin'],
	ORGADMIN: [
		'/organizations',
		'/tenants',
		'/portfolios',
		'/properties',
		'/units',
		'/leases',
		'/expenses',
		'/payouts',
		'/leaseInvoices',
		'/maintenanceOrders',
		'/roles',
		'/files',
	],
	PORTFOLIO: [
		'/tenants',
		'/portfolios',
		'/properties',
		'/units',
		'/leases',
		'/expenses',
		'/payouts',
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
	isAqaratechStaff,
}: {
	user: User | undefined;
	pathname: string;
	isAqaratechStaff: boolean;
}) => {
	if (
		ACCESSIBLE_ROUTES.AUTHENTICATED.some((route) => pathname.startsWith(route))
	) {
		return true;
	}

	if (
		isAqaratechStaff &&
		ACCESSIBLE_ROUTES.STAFF.some((route) => pathname.startsWith(route))
	) {
		return true;
	}

	if (user?.role?.roleType === 'ORGADMIN') {
		return ACCESSIBLE_ROUTES.ORGADMIN.some((route) =>
			pathname.startsWith(route),
		);
	} else if (user?.role?.roleType === 'PORTFOLIO') {
		return ACCESSIBLE_ROUTES.PORTFOLIO.some((route) =>
			pathname.startsWith(route),
		);
	} else if (user?.role?.roleType === 'TENANT') {
		return ACCESSIBLE_ROUTES.TENANT.some((route) => pathname.startsWith(route));
	} else {
		return false;
	}
};
