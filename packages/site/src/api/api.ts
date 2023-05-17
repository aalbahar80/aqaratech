import {
	Configuration,
	ExpenseCategoriesApi,
	ExpensesApi,
	FilesApi,
	LeaseInvoicesApi,
	LeasesApi,
	MaintenanceOrdersApi,
	OrganizationsApi,
	PayoutsApi,
	PortfoliosApi,
	PropertiesApi,
	RolesApi,
	TenantsApi,
	UnitsApi,
	UsersApi,
} from './openapi';

import type { LoadEvent } from '@sveltejs/kit';

import { environment } from '$aqenvironment';

export const createApi = (loadFetch?: LoadEvent['fetch']) => {
	const headers: Record<string, string> = {
		// origin: PUBLIC_SITE_URL,
	};

	let basePath: string;
	const isReverseProxy = environment.PUBLIC_API_URL.endsWith('/api');

	if (loadFetch && isReverseProxy) {
		basePath = '/api';
	} else {
		basePath = environment.PUBLIC_API_URL;
	}

	const config = new Configuration({
		...(loadFetch ? { fetchApi: loadFetch } : {}),
		headers,
		basePath,
		credentials: 'include',
		middleware: [
			{
				// eslint-disable-next-line @typescript-eslint/require-await
				async onError(context) {
					console.log('error in api middleware', context);
				},
			},
		],
	});

	return {
		tenants: new TenantsApi(config),
		portfolios: new PortfoliosApi(config),
		properties: new PropertiesApi(config),
		units: new UnitsApi(config),
		leases: new LeasesApi(config),
		leaseInvoices: new LeaseInvoicesApi(config),
		expenses: new ExpensesApi(config),
		roles: new RolesApi(config),
		organizations: new OrganizationsApi(config),
		users: new UsersApi(config),
		expenseCategories: new ExpenseCategoriesApi(config),
		files: new FilesApi(config),
		payouts: new PayoutsApi(config),
		maintenanceOrders: new MaintenanceOrdersApi(config),
	};
};

export type Api = ReturnType<typeof createApi>;
