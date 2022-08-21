import { parseParams } from '$lib/utils/parse-params';

import type { PageLoad } from './$types';
export const load: PageLoad = async ({
	params,
	url: { searchParams },
	parent,
}) => {
	const parentStuff = await parent();
	const { page } = parseParams(searchParams);
	const leaseId = params.id;

	const [lease, invoices] = await Promise.all([
		parentStuff.api.leases.findOne({ id: leaseId }),
		parentStuff.api.leases.findInvoices({ id: leaseId, page, take: 100 }),
	]);

	return { lease, invoices };
};
