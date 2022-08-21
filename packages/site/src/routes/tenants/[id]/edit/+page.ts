import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const parentStuff = await parent();
	const tenant = await parentStuff.api.tenants.findOne({ id: params.id });

	return { tenant };
};
