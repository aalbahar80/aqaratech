import type { PageLoad } from './$types';

import { createApi } from '$api';

export const load: PageLoad = async ({ fetch, params }) => {
	const api = createApi(fetch);

	const messages = await api.leaseInvoices.findMessages({
		id: params.leaseInvoiceId,
	});

	return {
		messages,
	};
};
