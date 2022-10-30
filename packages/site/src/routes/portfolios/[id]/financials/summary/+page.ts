import { createApi } from '$api';
import type { PageLoad } from './$types';
import { calculateNet } from './calculate-net';

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
		net: calculateNet(income, expenses),
		properties,
		income,
		expenses,
	};
};
