import { createApi } from '$api';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { property } from '$lib/stores/filter/property';
import { range } from '$lib/stores/filter/range';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, params, depends }) => {
	// Filter options
	const { start, end } = get(range);
	const propertyId = get(property);
	depends(FilterEnum.Range, FilterEnum.Property);

	const { organizationId, portfolioId } = params;

	const api = createApi(fetch);

	const income = await api.portfolios.getIncomeByMonth({
		organizationId,
		portfolioId,
		propertyId: propertyId === null ? undefined : propertyId,
		start,
		end,
	});

	return {
		income,
	};
};
