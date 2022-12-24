import type { PageLoad } from './$types';
import { get } from 'svelte/store';

import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { property } from '$lib/stores/filter/property';
import { range } from '$lib/stores/filter/range';
import { unit } from '$lib/stores/filter/unit';
import { parseParams } from '$lib/utils/parse-params';

import { createApi } from '$api';

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

	const filter: Record<string, unknown> = {
		postAt: { gte: new Date(start), lte: new Date(end) },
	};

	// Only include propertyId & unitId if they're not null, otherwise we might
	// send a literal "undefined"

	if (propertyId) {
		filter.lease = { unit: { propertyId } };
	}

	if (unitId) {
		filter.lease = { unitId };
	}

	const api = createApi(fetch);

	const invoices = await api.portfolios.findAllLeaseInvoices({
		id: params.portfolioId,
		filter,
		...parseParams(searchParams),
	});

	return { invoices };
};
