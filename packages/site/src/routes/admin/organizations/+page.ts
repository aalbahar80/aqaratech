import type { PageLoad } from './$types';

import { createApi } from '$api';

export const load: PageLoad = async ({ fetch }) => {
	const api = createApi(fetch);

	const organizations = await api.organizations.findAll();

	return { organizations };
};
