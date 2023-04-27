import type { RequestHandler } from './$types';
import { MAX_LIMIT } from '@self/utils';

import { createApi } from '$api';
import { respondWithCsv } from '$lib/utils/respond-with-csv';

export const GET: RequestHandler = async ({ params, fetch }) => {
	const expenses = await createApi(fetch).portfolios.findAllExpenses({
		id: params.portfolioId,
		take: MAX_LIMIT,
	});

	return respondWithCsv(expenses.results, 'expenses');
};
