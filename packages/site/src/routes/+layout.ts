import { redirect } from '@sveltejs/kit';

import { LOGIN } from '$lib/constants/routes';
import { isPublicRoute } from '$lib/utils/is-public-route';

import type { LayoutLoad } from './$types';

// eslint-disable-next-line @typescript-eslint/require-await
export const load: LayoutLoad = async ({ data, url: { pathname } }) => {
	// Checking for data.user and redirecting here causes this function to catch
	// all the random requests by bots and crawlers that are not logged in.
	// If this becomes a problem, we can move this function one level deeper,
	// letting all random requests fall through to the 404 page instead of
	// redirecting them to the auth0 login page.
	if (!isPublicRoute(pathname) && !data.user) {
		throw redirect(302, LOGIN);
	}

	return {
		...data,
	};
};
