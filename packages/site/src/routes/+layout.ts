import { redirect } from '@sveltejs/kit';

import type { LayoutLoad } from './$types';

import { loadLocaleAsync } from '$i18n/i18n-util.async';
import { LOGIN } from '$lib/constants/routes';
import { isPublicRoute } from '$lib/utils/is-public-route';

// TODO: destructure `data` to be more verbose
export const load: LayoutLoad = async ({ data, url: { pathname } }) => {
	// Checking for data.user and redirecting here causes this function to catch
	// all the random requests by bots and crawlers that are not logged in.
	// If this becomes a problem, we can move this function one level deeper,
	// letting all random requests fall through to the 404 page instead of
	// redirecting them to the auth0 login page.
	if (!isPublicRoute(pathname) && !data.user) {
		throw redirect(302, LOGIN);
	}

	console.log({ dl: data.locale }); // WARN: Remove

	// TODO: Move to top?
	// load dictionary into memory
	await loadLocaleAsync(data.locale);
	// await loadLocaleAsync('en');

	// const locale: Locales = 'en'; // WARN: hard-coded for now

	return {
		...data,
		// pass locale to the "rendering context"
		locale: data.locale,
	};
};
