import type { PageLoad } from './$types';
import { get } from 'svelte/store';

import { createApi } from '$api';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { isPaid } from '$lib/stores/filter/is-paid';
import { parseParams } from '$lib/utils/parse-params';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	fetch,
	depends,
}) => {
	// Filter options
	const isPaidFilter = get(isPaid);

	depends(FilterEnum.IsPaid);

	const api = createApi(fetch);

	const invoices = await api.organizations.findAllLeaseInvoices({
		id: params.organizationId,
		filter: { isPaid: isPaidFilter },
		...parseParams(searchParams),
	});

	return { invoices };
};
