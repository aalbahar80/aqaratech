import { createApi } from '$api';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { range } from '$lib/stores/filter/range';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, params, depends }) => {
	const api = createApi(fetch);

	const { start, end } = get(range);
	depends(FilterEnum.Range);

	const { organizationId } = params;

	const expensesByMonth = await api.portfolios.getExpensesByMonth({
		organizationId,
		portfolioId: params.portfolioId,
		start,
		end,
	});

	return {
		expensesByMonth,
	};
};
