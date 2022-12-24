import type { PageLoad } from './$types';
import { get } from 'svelte/store';

import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { range } from '$lib/stores/filter/range';

import { createApi } from '$api';

export const load: PageLoad = async ({ fetch, params, depends }) => {
	const api = createApi(fetch);

	const { start, end } = get(range);
	depends(FilterEnum.Range);

	const { organizationId, portfolioId } = params;

	const [expensesByCategory, expensesByLocation, categories] =
		await Promise.all([
			api.portfolios.getExpensesByCategory({
				organizationId,
				portfolioId,
				start,
				end,
			}),

			api.portfolios.getExpensesByLocation({
				organizationId,
				portfolioId,
				start,
				end,
			}),

			api.expenseCategories.findAll({
				organizationId,
			}),
		]);

	return {
		expensesByCategory,
		expensesByLocation,
		categories,
	};
};
