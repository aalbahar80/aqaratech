import { createApi } from '$api';
import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	fetch,
}) => {
	const api = createApi(fetch);

	const invoices = await api.portfolios.findAllLeaseInvoices({
		id: params.portfolioId,
		...parseParams(searchParams),
	});

	return { invoices };
};
