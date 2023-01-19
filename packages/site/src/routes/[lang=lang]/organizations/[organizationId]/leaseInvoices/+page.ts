import type { PageLoad } from './$types';

import { createApi } from '$api';
import { parseParams } from '$lib/utils/parse-params';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	fetch,
}) => {
	const api = createApi(fetch);

	const invoices = await api.organizations.findAllLeaseInvoices({
		id: params.organizationId,
		// TODO: Implement filter
		// filter,
		...parseParams(searchParams),
	});

	return { invoices };
};
