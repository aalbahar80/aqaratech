import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const parentStuff = await parent();
	const [leases, invoices] = await Promise.all([
		parentStuff.api.tenants.findLeases({ id: params.id, take: 50 }),
		parentStuff.api.tenants.findInvoices({ id: params.id, take: 1000 }),
	]);

	return { leases, invoices };
};
