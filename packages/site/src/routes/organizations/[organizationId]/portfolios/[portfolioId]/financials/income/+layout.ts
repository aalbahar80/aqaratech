import * as R from 'remeda';

import { createApi } from '$api';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { property } from '$lib/stores/filter/property';
import { range } from '$lib/stores/filter/range';
import { unit } from '$lib/stores/filter/unit';

import type { LayoutLoad } from './$types';

import { get } from 'svelte/store';

export const load: LayoutLoad = async ({ fetch, params, depends }) => {
	// Filter options
	const { start, end } = get(range);
	const propertyId = get(property);
	const unitId = get(unit);
	depends(FilterEnum.Range, FilterEnum.Property, FilterEnum.Unit);

	const { organizationId, portfolioId } = params;

	const api = createApi(fetch);

	const income = await api.portfolios.getIncomeByMonth({
		organizationId,
		portfolioId,
		propertyId: propertyId === null ? undefined : propertyId,
		unitId: unitId === null ? undefined : unitId,
		start,
		end,
	});

	/**
	 * Summed income data, used by multiple components.
	 */
	const sumIncome = {
		total: R.sumBy(income.total, (x) => x.amount),
		paid: R.sumBy(income.paid, (x) => x.amount),
		unpaid: R.sumBy(income.unpaid, (x) => x.amount),
	};

	return {
		income,
		sumIncome,
	};
};
