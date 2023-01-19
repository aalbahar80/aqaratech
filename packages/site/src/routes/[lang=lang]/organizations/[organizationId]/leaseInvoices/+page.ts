import type { PageLoad } from './$types';
import { get } from 'svelte/store';

import { createApi } from '$api';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { isPaid } from '$lib/stores/filter/is-paid';
import { range } from '$lib/stores/filter/range';
import { parseParams } from '$lib/utils/parse-params';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	fetch,
	depends,
}) => {
	// Filter options
	const { start, end } = get(range);
	const isPaidFilter = get(isPaid);

	depends(FilterEnum.Range, FilterEnum.IsPaid);

	const filter: Record<string, unknown> = {
		postAt: { gte: new Date(start), lte: new Date(end) },
		isPaid: isPaidFilter,
	};

	const api = createApi(fetch);

	const invoices = await api.organizations.findAllLeaseInvoices({
		id: params.organizationId,
		filter,
		...parseParams(searchParams),
	});

	return { invoices };
};
