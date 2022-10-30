import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const api = createApi(fetch);

	const income = await api.portfolios.getIncomeByMonth({
		portfolioId: params.id,
	});

	return {
		income,
	};
};
