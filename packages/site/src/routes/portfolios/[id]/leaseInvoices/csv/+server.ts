import { api } from '$api';
import { respondWithCsv } from '$lib/utils/respond-with-csv';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const leaseInvoices = await api().leaseInvoices.findAll({
		take: 999999999,
		portfolioId: params.id,
	});

	return respondWithCsv(leaseInvoices.results, 'leaseInvoices');
};
