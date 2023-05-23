import { QueryClient } from '@tanstack/svelte-query';

import { browser } from '$app/environment';
import type { LayoutLoad } from './$types';
import { get } from 'svelte/store';

import L, { setLocale } from '$i18n/i18n-svelte';
import { baseLocale } from '$i18n/i18n-util';
import { loadLocaleAsync } from '$i18n/i18n-util.async';
import { getTabLabels } from '$lib/components/tabs/tab-labels';
import { handleRedirect } from '$lib/utils/handle-redirect';

export const load: LayoutLoad = async ({
	data: { user, locale },
	url: { pathname },
	route,
}) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
				refetchOnWindowFocus: false,
				refetchOnMount: false,
			},
		},
	});

	const LLL = locale ?? baseLocale;
	// load dictionary into memory
	await loadLocaleAsync(LLL);

	// if you need to output a localized string in a `load` function,
	// you always need to call `setLocale` right before you access the `LL` store
	setLocale(locale ?? baseLocale);
	// get the translation functions value from the store
	const LL = get(L);
	const tabLabels = getTabLabels(LL);

	handleRedirect({
		user,
		route,
		pathname,
	});

	return {
		user,
		// pass locale to the "rendering context"
		locale,
		tabLabels,
		queryClient,
	};
};
