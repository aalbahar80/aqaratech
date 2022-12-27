import type { RequestHandler } from './$types';

import { createApi } from '$api';
import { respondWithCsv } from '$lib/utils/respond-with-csv';

export const GET: RequestHandler = async ({ params, fetch }) => {
	const leaseInvoices = await createApi(fetch).portfolios.findAllLeaseInvoices({
		id: params.portfolioId,
		take: 99999999,
	});

	return respondWithCsv(leaseInvoices.results, 'leaseInvoices');
};
