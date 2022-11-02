import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const [organization, roles] = await Promise.all([
		api.organizations.findOne({ id: params.organizationId }),
		// TODO handle pagination & default limit
		api.organizations.findRoles({ id: params.organizationId }),
	]);

	return { organization, roles };
};
