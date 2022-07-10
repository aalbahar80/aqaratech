import {
	Configuration,
	ExpensesApi,
	LeaseInvoicesApi,
	LeasesApi,
	PortfoliosApi,
	PropertiesApi,
	SearchApi,
	TenantsApi,
	UnitsApi,
} from '@self/sdk';
import type { LoadEvent } from '@sveltejs/kit';

export const api = ({
	token,
	url,
	loadFetch,
}: {
	token: string;
	url: URL;
	loadFetch?: LoadEvent['fetch'];
}) => {
	const basePath = `${url.origin}/api`;

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
		search: new SearchApi(config),
	};
};

export type Api = ReturnType<typeof api>;
