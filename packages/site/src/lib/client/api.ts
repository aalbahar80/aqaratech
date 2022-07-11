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
	loadFetch,
}: {
	token: string;
	loadFetch?: LoadEvent['fetch'];
}) => {
	// get from flightcontrol.json https://flightcontrol.notion.site/Flightcontrol-Docs-8d9ca4edb5564165a9557df32818af0c

	// Else VITE_API_URL is set, it is used as the base path
	// Else VITE_SITE_URL is appended with `/api` and used as the base path

	const proxied = import.meta.env.VITE_SITE_URL
		? `${import.meta.env.VITE_SITE_URL}`
		: undefined;

	const basePath = import.meta.env.VITE_API_URL || proxied;

	const headers = { Authorization: `Bearer ${token}` };
	const config = new Configuration({
		...(loadFetch && { fetchApi: loadFetch }),
		headers,
		// TODO replace with url
		basePath: 'http://localhost:3005/v1/api',
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
