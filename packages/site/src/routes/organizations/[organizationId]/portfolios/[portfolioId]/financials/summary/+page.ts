import { createApi } from '$api';
import { calculateNet } from '$lib/components/dashboard/stats/calculate-net';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { property } from '$lib/stores/filter/property';
import { range } from '$lib/stores/filter/range';
import { unit } from '$lib/stores/filter/unit';

import type { PageLoad } from './$types';

import { get } from 'svelte/store';

export const load: PageLoad = async ({ fetch, params, depends }) => {
	// Filter options
	const { start, end } = get(range);
	const propertyId = get(property);
	const unitId = get(unit);
	depends(FilterEnum.Range, FilterEnum.Property, FilterEnum.Unit);

	const api = createApi(fetch);

	const { organizationId, portfolioId } = params;

	const [income, expenses] = await Promise.all([
		api.portfolios.getIncomeByMonth({
			organizationId,
			portfolioId,
			start,
			end,
			// When getting incomeByMonth, we don't want to differentiate between
			// (a) `undefined` propertyId and (b) `null` propertyId
			propertyId: propertyId === null ? undefined : propertyId,
			unitId: unitId === null ? undefined : unitId,
		}),

		api.portfolios.getExpensesByMonth({
			organizationId,
			portfolioId,
			propertyId,
			unitId,
			start,
			end,
		}),
	]);

	return {
		net: calculateNet(income.paid, expenses),
		income,
		expenses,
	};
};
