import type { PageLoad } from './$types';
import { get } from 'svelte/store';

import { createApi } from '$api';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { isPaid } from '$lib/stores/filter/is-paid';
import { isPaidLate } from '$lib/stores/filter/is-paid-late';
import { isPaidOnline } from '$lib/stores/filter/is-paid-online';
import { range, rangeKind } from '$lib/stores/filter/range';
import { parseParams } from '$lib/utils/parse-params';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	fetch,
	depends,
}) => {
	// Filter options
	const { start, end } = get(range);
	const rangeKindFilter = get(rangeKind);
	const isPaidFilter = get(isPaid);
	const isPaidOnlineFilter = get(isPaidOnline);
	const isPaidLateFilter = get(isPaidLate);

	depends(
		FilterEnum.Range,
		FilterEnum.RangeKind,
		FilterEnum.IsPaid,
		FilterEnum.IsPaidOnline,
		FilterEnum.IsPaidLate,
	);

	const filter: Record<string, unknown> = {
		[rangeKindFilter]: { gte: new Date(start), lte: new Date(end) },
		isPaid: isPaidFilter,
		mfPaymentId:
			isPaidOnlineFilter === true
				? { not: null }
				: isPaidOnlineFilter === false
				? { equals: null }
				: undefined,
	};

	const api = createApi(fetch);

	const invoices = await api.organizations.findAllLeaseInvoices({
		id: params.organizationId,
		filter,
		filterCustom: {
			isPaidLate: isPaidLateFilter,
		},
		...parseParams(searchParams),
	});

	return { invoices };
};
