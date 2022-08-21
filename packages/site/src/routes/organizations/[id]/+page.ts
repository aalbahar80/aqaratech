import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const parentStuff = await parent();

	const [organization, roles] = await Promise.all([
		parentStuff.api.organizations.findOne({ id: params.id }),
		// TODO handle pagination & default limit
		parentStuff.api.organizations.findRoles({ id: params.id }),
	]);

	return { organization, roles };
};
