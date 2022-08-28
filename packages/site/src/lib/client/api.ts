import { env } from '$env/dynamic/public';
import {
	AggregateApi,
	Configuration,
	ExpenseCategoriesApi,
	ExpensesApi,
	FilesApi,
	LeaseInvoicesApi,
	LeasesApi,
	OrganizationsApi,
	PayoutsApi,
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

	const basePath = env.PUBLIC_API_URL;

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
		users: new UsersApi(config),
		expenseCategories: new ExpenseCategoriesApi(config),
		files: new FilesApi(config),
		payouts: new PayoutsApi(config),
	};
};

export type Api = ReturnType<typeof api>;
