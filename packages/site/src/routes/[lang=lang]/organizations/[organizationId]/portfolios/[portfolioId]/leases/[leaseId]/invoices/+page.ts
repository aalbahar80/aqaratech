import type { PageLoad } from './$types';
import { get } from 'svelte/store';

import { createApi } from '$api';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { isPaid } from '$lib/stores/filter/is-paid';
import { isPaidOnline } from '$lib/stores/filter/is-paid-online';
import { parseParams } from '$lib/utils/parse-params';

export const load: PageLoad = async ({
	params,
	fetch,
	url: { searchParams },
	depends,
}) => {
	// Filter options
	const isPaidFilter = get(isPaid);
	const isPaidOnlineFilter = get(isPaidOnline);

	depends(FilterEnum.IsPaid, FilterEnum.IsPaidOnline);

	const api = createApi(fetch);

	const { leaseId } = params;

	const invoices = await api.leases.findInvoices({
		id: leaseId,
		filter: {
			isPaid: isPaidFilter,
			mfPaymentId: isPaidOnlineFilter ? { not: null } : undefined,
		},
		...parseParams(searchParams),
	});

	return { invoices };
};
