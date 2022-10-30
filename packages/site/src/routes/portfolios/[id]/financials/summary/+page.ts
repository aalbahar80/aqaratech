import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const api = createApi(fetch);

	const [properties, income, expenses] = await Promise.all([
		api.portfolios.findProperties({
			id: params.id,
		}),

		api.portfolios.getIncomeByMonth({
			portfolioId: params.id,
		}),

		api.portfolios.getExpensesByMonth({
			portfolioId: params.id,
		}),
	]);

	return {
		properties,
		income,
		expenses,
	};
};
