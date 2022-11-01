import { createApi } from '$api';
import { range } from '$lib/stores/range';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, depends }) => {
	const api = createApi(fetch);

	const { start, end } = get(range);
	depends('range');

	const income = await api.portfolios.getIncomeByMonth({
		portfolioId: params.id,
		start,
		end,
	});

	return {
		income,
	};
};
