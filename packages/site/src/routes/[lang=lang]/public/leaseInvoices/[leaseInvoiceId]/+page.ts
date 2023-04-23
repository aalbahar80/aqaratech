import type { PageLoad } from './$types';

import { createApi } from '$api';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const leaseInvoice = await api.leaseInvoices.findOnePublic({
		id: params.leaseInvoiceId,
	});

	return { leaseInvoice };
};
