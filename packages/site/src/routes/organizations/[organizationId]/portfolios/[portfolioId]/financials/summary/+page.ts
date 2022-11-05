import { createApi } from '$api';
import { calculateNet } from '$lib/components/dashboard/stats/calculate-net';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { property } from '$lib/stores/filter/property';
import { range } from '$lib/stores/filter/range';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, depends }) => {
	// Filter options
	const { start, end } = get(range);
	const propertyId = get(property);
	depends(FilterEnum.Range, FilterEnum.Property);

	const api = createApi(fetch);

	const { organizationId, portfolioId } = params;

	const [properties, income, expenses] = await Promise.all([
		api.portfolios.findProperties({
			id: portfolioId,
		}),

		api.portfolios.getIncomeByMonth({
			organizationId,
			portfolioId,
			propertyId,
			start,
			end,
		}),

		api.portfolios.getExpensesByMonth({
			organizationId,
			portfolioId,
			propertyId,
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
