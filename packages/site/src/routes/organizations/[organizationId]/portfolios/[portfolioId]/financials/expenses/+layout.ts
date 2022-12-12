import { get } from 'svelte/store';

import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { property } from '$lib/stores/filter/property';
import { range } from '$lib/stores/filter/range';
import { unit } from '$lib/stores/filter/unit';

import { createApi } from '$api';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, params, depends }) => {
	// Filter options
	const { start, end } = get(range);
	const propertyId = get(property);
	const unitId = get(unit);
	depends(FilterEnum.Range, FilterEnum.Property, FilterEnum.Unit);

	const { organizationId } = params;

	const api = createApi(fetch);

	const expensesByMonth = await api.portfolios.getExpensesByMonth({
		organizationId,
		portfolioId: params.portfolioId,
		propertyId,
		unitId,
		start,
		end,
	});

	return {
		expensesByMonth,
	};
};
