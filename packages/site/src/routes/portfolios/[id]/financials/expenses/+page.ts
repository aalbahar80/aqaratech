import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const api = createApi(fetch);

	const expenses = await api.portfolios.getExpensesByMonth({
		portfolioId: params.id,
	});

	return {
		expenses,
	};
};
