import type { RequestHandler } from './$types';
import { MAX_LIMIT } from '@self/utils';

import { createApi } from '$api';
import { respondWithCsv } from '$lib/utils/respond-with-csv';

export const GET: RequestHandler = async ({ params, fetch }) => {
	const payouts = await createApi(fetch).portfolios.findPayouts({
		take: MAX_LIMIT,
		id: params.portfolioId,
	});

	return respondWithCsv(payouts.results, 'payouts');
};
