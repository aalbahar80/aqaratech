import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const parentStuff = await parent();

	const lease = await parentStuff.api.leases.findOne({ id: params.id });

	return { lease };
};
