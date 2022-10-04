import { api } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	// get fresh data from backend
	const user = await api(fetch).users.findProfile();

	return { user };
};
