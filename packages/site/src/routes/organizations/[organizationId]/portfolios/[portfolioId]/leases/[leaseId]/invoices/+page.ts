import type { PageLoad } from './$types';

import { parseParams } from '$lib/utils/parse-params';

import { createApi } from '$api';

export const load: PageLoad = async ({
	params,
	fetch,
	url: { searchParams },
}) => {
	const api = createApi(fetch);

	const { leaseId } = params;

	const invoices = await api.leases.findInvoices({
		id: leaseId,
		...parseParams(searchParams),
	});

	return { invoices };
};
