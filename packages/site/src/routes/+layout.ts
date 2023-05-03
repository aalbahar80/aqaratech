import { QueryClient } from '@tanstack/svelte-query';

import { browser } from '$app/environment';
import type { LayoutLoad } from './$types';
import { get } from 'svelte/store';

import { createApi } from '$api';
import L, { setLocale } from '$i18n/i18n-svelte';
import { baseLocale } from '$i18n/i18n-util';
import { loadLocaleAsync } from '$i18n/i18n-util.async';
import { getTabLabels } from '$lib/components/tabs/tab-labels';
import { fallbackPortfolioId } from '$lib/stores/fallback-portfolio-id';
import { handleRedirect } from '$lib/utils/handle-redirect';

export const load: LayoutLoad = async ({
	fetch,
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

	// Used in nav-tree (only for admins)
	let portfolioId = get(fallbackPortfolioId);

	// The fallbackPortfolioId should already be set in the store during client-side
	// navigation, so we skip the API call.
	if (!portfolioId && user?.role?.roleType === 'ORGADMIN') {
		const api = createApi(fetch);

		const portfolios = await api.portfolios.findAll();

		portfolioId = portfolios.results[0]?.id;

		if (browser) {
			// Avoid extra network requests. The whole point of this is to ensure we have
			// a portfolioId so we can use it in the nav-tree.
			fallbackPortfolioId.set(portfolioId);
		}
	}

	return {
		user,
		// pass locale to the "rendering context"
		locale,
		tabLabels,
		queryClient,
		fallbackPortfolioId: portfolioId,
	};
};
