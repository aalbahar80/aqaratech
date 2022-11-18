import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const id = params.organizationId;

	const organization = await api.organizations.findOne({ id });

	return { organization };
};
