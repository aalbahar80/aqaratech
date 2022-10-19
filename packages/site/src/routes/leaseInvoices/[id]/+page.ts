import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const [leaseInvoice] = await Promise.all([
		api.leaseInvoices.findOne({
			id: params.id,
		}),
	]);

	return { leaseInvoice };
};
