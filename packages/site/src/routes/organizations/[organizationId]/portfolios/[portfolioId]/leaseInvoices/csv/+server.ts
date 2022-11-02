import { createApi } from '$api';
import { respondWithCsv } from '$lib/utils/respond-with-csv';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, fetch }) => {
	const leaseInvoices = await createApi(fetch).leaseInvoices.findAll({
		take: 999999999,
		portfolioId: params.portfolioId,
	});

	return respondWithCsv(leaseInvoices.results, 'leaseInvoices');
};
