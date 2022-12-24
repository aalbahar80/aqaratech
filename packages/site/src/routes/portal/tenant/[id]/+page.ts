import type { PageLoad } from './$types';

import { parseParams } from '$lib/utils/parse-params';

import { createApi } from '$api';

export const load: PageLoad = async ({
	params,
	fetch,
	url: { searchParams },
}) => {
	const api = createApi(fetch);

	const invoices = await api.tenants.findInvoices({
		id: params.id,
		...parseParams(searchParams),
	});

	return {
		invoices,
	};
};
