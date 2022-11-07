import { createApi } from '$api';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { range } from '$lib/stores/filter/range';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, depends }) => {
	const api = createApi(fetch);

	const { start, end } = get(range);
	depends(FilterEnum.Range);

	const { organizationId, portfolioId } = params;

	const [expenses, categories] = await Promise.all([
		api.portfolios.findAllExpenses({
			id: portfolioId,
			start,
			end,
		}),

		api.expenseCategories.findAll({
			organizationId,
		}),
	]);

	return {
		expenses,
		categories,
	};
};
