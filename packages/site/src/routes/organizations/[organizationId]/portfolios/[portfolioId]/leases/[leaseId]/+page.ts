import { createApi } from '$api';
import { parseParams } from '$lib/utils/parse-params';

import type { PageLoad } from './$types';
export const load: PageLoad = async ({
	params,
	url: { searchParams },
	fetch,
}) => {
	const api = createApi(fetch);

	const { page } = parseParams(searchParams);

	const { leaseId } = params;

	const [lease, invoices] = await Promise.all([
		api.leases.findOne({ id: leaseId }),
		api.leases.findInvoices({ id: leaseId, page, take: 100 }),
	]);

	return { lease, invoices };
};
