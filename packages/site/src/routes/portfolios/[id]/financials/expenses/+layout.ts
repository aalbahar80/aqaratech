import { createApi } from '$api';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { range } from '$lib/stores/filter/range';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, params, depends }) => {
	const api = createApi(fetch);

	const { start, end } = get(range);
	depends(FilterEnum.Range);

	const expenses = await api.portfolios.getExpensesByMonth({
		portfolioId: params.id,
		start,
		end,
	});

	return {
		expenses,
	};
};
