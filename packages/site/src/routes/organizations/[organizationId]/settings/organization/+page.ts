import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);
	const id = params.id;

	const [organization, roles] = await Promise.all([
		api.organizations.findOne({ id }),
		api.organizations.findRoles({ id }),
	]);

	return { organization, roles };
};
