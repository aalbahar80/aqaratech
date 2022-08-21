import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const parentStuff = await parent();
	const [leaseInvoice] = await Promise.all([
		parentStuff.api.leaseInvoices.findOne({
			id: params.id,
		}),
	]);

	return { leaseInvoice };
};
