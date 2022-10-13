import { api } from '$api';
import { LOGIN } from '$lib/constants/routes';
import { isPublicRoute } from '$lib/utils/is-public-route';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

// eslint-disable-next-line @typescript-eslint/require-await
export const load: LayoutLoad = async ({ fetch, data, url: { pathname } }) => {
	if (!isPublicRoute(pathname) && !data.user) {
		throw redirect(302, LOGIN);
	}

	const apiClient = api(fetch);

	return {
		api: apiClient,
		...data,
	};
};
