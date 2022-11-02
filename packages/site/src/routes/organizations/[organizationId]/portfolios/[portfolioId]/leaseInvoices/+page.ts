import { createApi } from '$api';
import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	fetch,
}) => {
	const api = createApi(fetch);

	const { page, take, sortOrder, orderBy } = parseParams(searchParams);
	const invoices = await api.leaseInvoices.findAll({
		page,
		take,
		sortOrder,
		orderBy,
		portfolioId: params.portfolioId,
	});

	return { invoices };
};
