import type { RequestHandler } from './$types';
import { MAX_LIMIT } from '@self/utils';

import { createApi } from '$api';
import { respondWithCsv } from '$lib/utils/respond-with-csv';

export const GET: RequestHandler = async ({ params, fetch }) => {
	const leaseInvoices = await createApi(fetch).portfolios.findAllLeaseInvoices({
		id: params.portfolioId,
		take: MAX_LIMIT,
	});

	return respondWithCsv(leaseInvoices.results, 'leaseInvoices');
};
