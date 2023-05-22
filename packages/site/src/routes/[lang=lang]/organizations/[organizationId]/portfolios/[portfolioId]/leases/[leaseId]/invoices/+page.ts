import type { PageLoad } from './$types';
import { get } from 'svelte/store';

import { createApi } from '$api';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { isPaid } from '$lib/stores/filter/is-paid';
import { isPaidOnline } from '$lib/stores/filter/is-paid-online';
import { payPhase } from '$lib/stores/filter/pay-phase';
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
	const payPhaseFilter = get(payPhase);

	depends(FilterEnum.IsPaid, FilterEnum.IsPaidOnline, FilterEnum.PayPhase);

	const api = createApi(fetch);

	const { leaseId } = params;

	const invoices = await api.leases.findInvoices({
		id: leaseId,
		filter: {
			isPaid: isPaidFilter,
			mfPaymentId:
				isPaidOnlineFilter === true
					? { not: null }
					: isPaidOnlineFilter === false
					? { equals: null }
					: undefined,
		},
		filterCustom: {
			payPhase: payPhaseFilter,
		},
		...parseParams(searchParams),
	});

	return { invoices };
};
