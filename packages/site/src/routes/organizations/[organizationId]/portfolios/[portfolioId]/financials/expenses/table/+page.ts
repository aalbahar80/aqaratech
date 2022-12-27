import type { PageLoad } from './$types';
import { get } from 'svelte/store';

import { createApi } from '$api';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { property } from '$lib/stores/filter/property';
import { range } from '$lib/stores/filter/range';
import { unit } from '$lib/stores/filter/unit';
import { parseParams } from '$lib/utils/parse-params';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	fetch,
	depends,
}) => {
	// Filter options
	const { start, end } = get(range);
	const propertyId = get(property);
	const unitId = get(unit);
	depends(FilterEnum.Range, FilterEnum.Property, FilterEnum.Unit);

	// If we use filter from the URL, we need to make an update here to avoid
	// overriding the start/end when spreading the searchParams.
	const queryFilter = searchParams.get('filter');

	if (queryFilter) {
		throw new Error(
			'Update this code to merge the URL + start/end filter options',
		);
	}

	const filter = {
		postAt: { gte: new Date(start), lte: new Date(end) },
	};

	const api = createApi(fetch);

	const expenses = await api.portfolios.findAllExpenses({
		id: params.portfolioId,
		propertyId,
		unitId,
		filter,
		...parseParams(searchParams),
	});

	return { expenses };
};
