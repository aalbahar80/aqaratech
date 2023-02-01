import type { PageLoad } from './$types';
import { get } from 'svelte/store';

import { createApi } from '$api';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { isPaid } from '$lib/stores/filter/is-paid';
import { isPaidOnline } from '$lib/stores/filter/is-paid-online';
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
	const isPaidOnlineFilter = get(isPaidOnline);

	depends(FilterEnum.Range, FilterEnum.IsPaid, FilterEnum.IsPaidOnline);

	const filter: Record<string, unknown> = {
		postAt: { gte: new Date(start), lte: new Date(end) },
		isPaid: isPaidFilter,
		mfPaymentId: isPaidOnlineFilter ? { not: null } : undefined,
	};

	const api = createApi(fetch);

	const invoices = await api.organizations.findAllLeaseInvoices({
		id: params.organizationId,
		filter,
		...parseParams(searchParams),
	});

	return { invoices };
};
