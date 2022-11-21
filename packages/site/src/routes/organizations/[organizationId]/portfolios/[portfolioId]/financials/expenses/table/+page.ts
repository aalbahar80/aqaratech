import { createApi } from '$api';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { parseParams } from '$lib/utils/parse-params';
import { property } from '$lib/stores/filter/property';
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
	depends(FilterEnum.Property);
	// TODO: enable range here.
	// const { start, end } = get(range);
	// depends(FilterEnum.Range, FilterEnum.Property);

	const api = createApi(fetch);

	const expenses = await api.portfolios.findAllExpenses({
		id: params.portfolioId,
		propertyId,
		...parseParams(searchParams),
	});

	return { expenses };
};
