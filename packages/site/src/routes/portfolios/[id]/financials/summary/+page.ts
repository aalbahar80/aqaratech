import { createApi } from '$api';
import { range } from '$lib/stores/range';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';
import { calculateNet } from './calculate-net';

export const load: PageLoad = async ({ fetch, params, depends }) => {
	const api = createApi(fetch);

	const { start, end } = get(range);
	depends('range');

	const [properties, income, expenses] = await Promise.all([
		api.portfolios.findProperties({
			id: params.id,
		}),

		api.portfolios.getIncomeByMonth({
			portfolioId: params.id,
			start,
			end,
		}),

		api.portfolios.getExpensesByMonth({
			portfolioId: params.id,
			start,
			end,
		}),
	]);

	return {
		net: calculateNet(income.paid, expenses),
		properties,
		income,
		expenses,
	};
};
