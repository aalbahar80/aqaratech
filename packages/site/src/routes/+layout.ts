import { redirect } from '@sveltejs/kit';
import { withQuery } from 'ufo';

import type { LayoutLoad } from './$types';
import { get } from 'svelte/store';

import L, { setLocale } from '$i18n/i18n-svelte';
import { baseLocale } from '$i18n/i18n-util';
import { loadLocaleAsync } from '$i18n/i18n-util.async';
import { getTabLabels } from '$lib/components/tabs/tab-labels';
import { DESTINATION } from '$lib/constants/misc';
import { LOGIN } from '$lib/constants/routes';
import { isPublicRoute } from '$lib/utils/is-public-route';

export const load: LayoutLoad = async ({
	data: { user, locale },
	url: { pathname },
}) => {
	// load dictionary into memory
	await loadLocaleAsync(locale ?? baseLocale);

	// if you need to output a localized string in a `load` function,
	// you always need to call `setLocale` right before you access the `LL` store
	setLocale(locale ?? baseLocale);
	// get the translation functions value from the store
	const LL = get(L);
	const tabLabels = getTabLabels(LL);

	// Checking for data.user and redirecting here causes this function to catch
	// all the random requests by bots and crawlers that are not logged in.
	// If this becomes a problem, we can move this function one level deeper,
	// letting all random requests fall through to the 404 page instead of
	// redirecting them to the auth0 login page.
	if (!isPublicRoute(pathname) && !user) {
		// preserve the current destination in the query string,
		// so we can redirect back after login
		const location = withQuery(LOGIN, { [DESTINATION]: pathname });

		throw redirect(302, location);
	}

	return {
		user,
		// pass locale to the "rendering context"
		locale,
		tabLabels,
	};
};
