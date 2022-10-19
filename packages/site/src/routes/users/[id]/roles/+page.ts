import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	// get fresh data from backend
	const user = await createApi(fetch).users.findProfile();

	return { user };
};
