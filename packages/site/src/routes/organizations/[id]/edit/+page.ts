import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const parentStuff = await parent();
	const organization = await parentStuff.api.organizations.findOne({
		id: params.id,
	});

	return { organization };
};
