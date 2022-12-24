import type { PageLoad } from './$types';

import { createApi } from '$api';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const id = params.organizationId;

	const organization = await api.organizations.findOne({ id });

	return { organization };
};
