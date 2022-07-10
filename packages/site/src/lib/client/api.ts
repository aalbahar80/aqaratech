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
	const basePath =
		import.meta.env.VITE_API_URL ?? 'https://nestjs-dev.onrender.com';

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
