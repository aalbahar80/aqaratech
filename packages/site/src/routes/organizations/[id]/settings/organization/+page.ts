import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const id = params.id;

	const parentStuff = await parent();
	const [organization, roles] = await Promise.all([
		parentStuff.api.organizations.findOne({ id }),
		parentStuff.api.organizations.findRoles({ id }),
	]);

	return { organization, roles };
};
