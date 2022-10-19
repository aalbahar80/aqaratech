import { createApi } from '$api';
import { respondWithCsv } from '$lib/utils/respond-with-csv';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, fetch }) => {
	const expenses = await createApi(fetch).expenses.findAll({
		take: 999999999,
		portfolioId: params.id,
	});

	return respondWithCsv(expenses.results, 'expenses');
};
