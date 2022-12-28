import * as SentryNode from '@sentry/node?server';
import * as SentrySvelte from '@sentry/svelte?client';

import type { Breadcrumb } from '@sentry/svelte';

import { environment } from '$aqenvironment';

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

	// Sentry
	let traceValue: string | undefined;

	if (import.meta.env.SSR) {
		const transactionNode = SentryNode.getCurrentHub()
			.getScope()
			?.getTransaction();

		traceValue = transactionNode?.toTraceparent();
	}

	if (!import.meta.env.SSR) {
		// eslint-disable-next-line import/namespace
		const transactionSvelte = SentrySvelte.getCurrentHub()
			.getScope()
			?.getTransaction();

		if (transactionSvelte) {
			traceValue = transactionSvelte.toTraceparent();
		} else {
			// create a new transaction manually
			// when running in load in the browser, the Sentry browser SDK does not create a transaction (yet)
			// eslint-disable-next-line import/namespace
			const transaction = SentrySvelte.startTransaction({
				op: 'http.client',
				name: 'api()',
			});

			// TODO why is transaction possibly undefined?
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			traceValue = transaction?.toTraceparent();
		}
	}

	if (traceValue) {
		// TODO avoid reusing api() more than once to ensure no duplicate trace headers
		// Applying middleware to the Config class causes loadFetch to be not used (duplicate data requests)
		// Alternative: update node version in production 18.3.0+
		headers['sentry-trace'] = traceValue;
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
					console.error('error in api middleware', context);
					const breadcrumb: Breadcrumb = {
						category: 'http',
						message: `Error in api middleware while fetching: ${context.url}`,
						level: 'error',
						...context,
					};
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
					if (import.meta.env.SSR && SentryNode) {
						SentryNode.addBreadcrumb(breadcrumb);
						// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
					} else if (!import.meta.env.SSR && SentrySvelte) {
						// eslint-disable-next-line import/namespace
						SentrySvelte.addBreadcrumb(breadcrumb);
					}
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
