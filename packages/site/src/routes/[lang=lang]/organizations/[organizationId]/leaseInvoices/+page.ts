import type { PageLoad } from './$types';

import { createApi } from '$api';
import { parseParams } from '$lib/utils/parse-params';

export const load: PageLoad = async ({ url: { searchParams }, fetch }) => {
	const api = createApi(fetch);

	const invoices = await api.leaseInvoices.findAll({
		...parseParams(searchParams),
	});

	return { invoices };
};
