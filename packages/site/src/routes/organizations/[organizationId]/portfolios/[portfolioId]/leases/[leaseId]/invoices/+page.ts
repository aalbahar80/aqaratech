import type { PageLoad } from './$types';

import { createApi } from '$api';
import { parseParams } from '$lib/utils/parse-params';

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
