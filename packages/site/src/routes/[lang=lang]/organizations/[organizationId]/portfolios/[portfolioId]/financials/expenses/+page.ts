import type { PageLoad } from './$types';
import { get } from 'svelte/store';

import { createApi } from '$api';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { property } from '$lib/stores/filter/property';
import { range } from '$lib/stores/filter/range';
import { unit } from '$lib/stores/filter/unit';

export const load: PageLoad = async ({ fetch, params, depends }) => {
	const { start, end } = get(range);
	const propertyId = get(property);
	const unitId = get(unit);
	depends(FilterEnum.Range, FilterEnum.Property, FilterEnum.Unit);

	const { organizationId, portfolioId } = params;

	const api = createApi(fetch);

	const [expensesByCategory, expensesByLocation, categories] =
		await Promise.all([
			api.portfolios.getExpensesByCategory({
				organizationId,
				portfolioId,
				start,
				end,
				propertyId,
				unitId,
			}),

			api.portfolios.getExpensesByLocation({
				organizationId,
				portfolioId,
				start,
				end,
				propertyId,
				unitId,
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
