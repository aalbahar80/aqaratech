import { api } from '$api';
import { LOGIN } from '$lib/constants/routes';
import { isPublicRoute } from '$lib/utils/is-public-route';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, data, url: { pathname } }) => {
	if (!data.isAuthenticated && !isPublicRoute(pathname)) {
		throw redirect(302, LOGIN);
	}

	const apiClient = api({
		loadFetch: fetch,
		token: data.accessToken,
		roleId: data.user?.role?.id,
	});
	return {
		api: apiClient,
		...data,
		apiConfig: {
			token: data.accessToken,
			roleId: data.user?.role?.id,
		},
	};
};
