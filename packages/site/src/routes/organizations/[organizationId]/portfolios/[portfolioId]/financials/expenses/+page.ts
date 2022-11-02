import { createApi } from '$api';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { range } from '$lib/stores/filter/range';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, depends, parent }) => {
	const api = createApi(fetch);

	const { start, end } = get(range);
	depends(FilterEnum.Range);

	const organizationId = (await parent()).user?.role?.organizationId;

	const [expenses, categories] = await Promise.all([
		api.portfolios.findAllExpenses({
			organizationId,
			id: params.id,
			start,
			end,
		}),

		api.expenseCategories.findAll({
			organizationId,
		}),
	]);

	return {
		expenseEntries: expenses,
		categories,
	};
};
