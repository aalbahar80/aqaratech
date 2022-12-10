import { createApi } from '$api';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const leaseInvoice = await api.leaseInvoices.findOne({
		id: params.leaseInvoiceId,
	});

	return { leaseInvoice };
};
