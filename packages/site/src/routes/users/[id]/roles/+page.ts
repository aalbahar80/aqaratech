import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const parentStuff = await parent();
	const user = parentStuff.api.users.findProfile();
	return { user };
};
