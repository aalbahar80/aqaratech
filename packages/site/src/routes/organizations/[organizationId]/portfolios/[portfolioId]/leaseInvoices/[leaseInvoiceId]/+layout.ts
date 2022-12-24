import type { LayoutLoad } from './$types';

import { createApi } from '$api';

export const load: LayoutLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const leaseInvoice = await api.leaseInvoices.findOne({
		id: params.leaseInvoiceId,
	});

	return { leaseInvoice };
};
