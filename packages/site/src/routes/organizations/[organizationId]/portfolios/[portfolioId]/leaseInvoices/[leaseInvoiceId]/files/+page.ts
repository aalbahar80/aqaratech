import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const api = createApi(fetch);

	const files = await api.files.findAll({
		relationKey: 'leaseInvoice',
		relationValue: params.leaseInvoiceId,
	});

	return {
		files,
	};
};
