import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const parentStuff = await parent();
	const invoice = await parentStuff.api.leaseInvoices.findOne({
		id: params.id,
	});

	return { invoice };
};
