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
	let config: Configuration;

	const basePath = import.meta.env.VITE_VERCEL_ENV
		? import.meta.env.VITE_API_URL // TODO prod
		: 'http://localhost:3002';

	const headers = { Authorization: `Bearer ${token}` };

	if (loadFetch) {
		config = new Configuration({
			fetchApi: loadFetch,
			headers,
			basePath,
		});
	} else {
		config = new Configuration({ headers, basePath });
	}

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
