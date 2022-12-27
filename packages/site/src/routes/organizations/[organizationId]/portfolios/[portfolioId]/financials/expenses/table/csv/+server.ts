import type { RequestHandler } from './$types';

import { createApi } from '$api';
import { respondWithCsv } from '$lib/utils/respond-with-csv';

export const GET: RequestHandler = async ({ params, fetch }) => {
	const expenses = await createApi(fetch).portfolios.findAllExpenses({
		id: params.portfolioId,
		take: 999999999,
	});

	return respondWithCsv(expenses.results, 'expenses');
};
