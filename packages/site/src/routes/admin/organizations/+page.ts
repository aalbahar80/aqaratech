import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const api = createApi(fetch);

	const organizations = await api.organizations.findAll();

	return { organizations };
};
