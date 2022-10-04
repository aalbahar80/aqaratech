import { api } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	// TODO: discard this load api call and use locals.user
	const user = await api(fetch).users.findProfile();

	return { user };
};
