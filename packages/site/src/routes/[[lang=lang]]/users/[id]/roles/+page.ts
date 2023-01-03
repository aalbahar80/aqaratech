import type { PageLoad } from './$types';

import { createApi } from '$api';

export const load: PageLoad = async ({ fetch }) => {
	// get fresh data from backend
	const user = await createApi(fetch).users.findProfile();

	return { user };
};
