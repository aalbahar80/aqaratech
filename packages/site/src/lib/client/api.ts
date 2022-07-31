import {
	AggregateApi,
	Configuration,
	ExpensesApi,
	LeaseInvoicesApi,
	LeasesApi,
	MetaApi,
	OrganizationsApi,
	PortfoliosApi,
	PropertiesApi,
	RolesApi,
	SearchApi,
	TenantsApi,
	UnitsApi,
	UsersApi,
} from '@self/sdk';
import type { LoadEvent } from '@sveltejs/kit';

export const api = ({
	loadFetch,
	token,
	roleId,
}: {
	loadFetch?: LoadEvent['fetch'];
	token: string;
	roleId?: string | undefined;
}) => {
	const headers = {
		Authorization: `Bearer ${token}`,
		...(roleId ? { 'x-role-id': roleId } : {}),
	};

	// const basePath = import.meta.env.VITE_API_URL || 'http://localhost:3002';
	const basePath = import.meta.env.VITE_API_URL;
	// const basePath = 'http://localhost:3002';
	// const basePath = 'https://localhost/api';
	// const basePath = 'https://localhost/api/';

	const config = new Configuration({
		...(loadFetch ? { fetchApi: loadFetch } : {}),
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
		roles: new RolesApi(config),
		search: new SearchApi(config),
		aggregate: new AggregateApi(config),
		organizations: new OrganizationsApi(config),
		meta: new MetaApi(config),
		users: new UsersApi(config),
	};
};

export type Api = ReturnType<typeof api>;
