import {
	AnalyticsApi,
	Configuration,
	ExpensesApi,
	LeaseInvoicesApi,
	LeasesApi,
	MetaApi,
	PortfoliosApi,
	PropertiesApi,
	SearchApi,
	TenantsApi,
	UnitsApi,
} from '@self/sdk';
import type { LoadEvent } from '@sveltejs/kit';

export const api = ({
	token,
	loadFetch,
}: {
	token: string;
	loadFetch?: LoadEvent['fetch'];
}) => {
	const headers = { Authorization: `Bearer ${token}` };

	// const basePath = import.meta.env.VITE_API_URL || 'http://localhost:3002';
	const basePath = import.meta.env.VITE_API_URL;
	// const basePath = 'http://localhost:3002';
	// const basePath = 'https://localhost/api';
	// const basePath = 'https://localhost/api/';

	const config = new Configuration({
		...(loadFetch && { fetchApi: loadFetch }),
		headers,
		basePath,
	});

	return {
		tenants: new TenantsApi(config),
		portfolios: new PortfoliosApi(config),
		properties: new PropertiesApi(config),
		units: new UnitsApi(config),
		leases: new LeasesApi(config),
		leaseInvoices: new LeaseInvoicesApi(config),
		expenses: new ExpensesApi(config),
		search: new SearchApi(config),
		analytics: new AnalyticsApi(config),
		meta: new MetaApi(config),
	};
};

export type Api = ReturnType<typeof api>;
