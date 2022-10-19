import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const [leases, invoices] = await Promise.all([
		api.tenants.findLeases({ id: params.id, take: 50 }),
		api.tenants.findInvoices({ id: params.id, take: 1000 }),
	]);

	return { leases, invoices };
};
