import { createApi } from '$api';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { property } from '$lib/stores/filter/property';
import { range } from '$lib/stores/filter/range';
import { parseParams } from '$lib/utils/parse-params';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	fetch,
	depends,
}) => {
	// Filter options
	const propertyId = get(property);
	const { start, end } = get(range);
	depends(FilterEnum.Range, FilterEnum.Property);

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
		filter,
		...parseParams(searchParams),
	});

	return { expenses };
};
