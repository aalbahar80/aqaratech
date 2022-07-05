import {
	Configuration,
	ExpensesApi,
	LeaseInvoicesApi,
	LeasesApi,
	PortfoliosApi,
	PropertiesApi,
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
	// TODO prod
	const basePath = import.meta.env.VITE_API_URL || 'http://localhost:3002';

	const headers = { Authorization: `Bearer ${token}` };

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
	};
};

export type Api = ReturnType<typeof api>;
