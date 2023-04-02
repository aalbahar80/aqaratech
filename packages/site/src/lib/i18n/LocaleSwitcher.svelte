<script lang="ts">
	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	import { replaceLocaleInUrl } from './replace-local-url';

	import type { Locales } from '$i18n/i18n-types';

	import { setLocale, locale } from '$i18n/i18n-svelte';
	import { locales } from '$i18n/i18n-util';
	import { loadLocaleAsync } from '$i18n/i18n-util.async';
	import { PREF_LOCALE } from '$lib/constants/misc';
	import { LOCALE_LABELS } from '$lib/i18n/locale-labels';

	const switchLocale = async (
		newLocale: Locales,
		updateHistoryState = true,
	) => {
		if (!newLocale || $locale === newLocale) return;

		// load new dictionary from server
		await loadLocaleAsync(newLocale);

		// select locale
		setLocale(newLocale);

		// update `lang` attribute
		document.querySelector('html')?.setAttribute('lang', newLocale);

		// update `dir` attribute
		document
			.querySelector('html')
			?.setAttribute('dir', newLocale === 'ar' ? 'rtl' : 'ltr');

		if (updateHistoryState) {
			// update url to reflect locale changes
			history.pushState(
				{ locale: newLocale },
				'',
				replaceLocaleInUrl($page.url, newLocale),
			);
		}

		// run the `load` function again
		void invalidateAll();
	};

	// update locale when navigating via browser back/forward buttons
	const handlePopStateEvent = async ({ state }: PopStateEvent) =>
		await switchLocale(state.locale, false);

	// update locale when page store changes
	// TODO: Still needed? Since we do a full page reload on locale switch.
	$: if (browser) {
		const lang = $page.params['lang'] as Locales;
		void switchLocale(lang, false);
		history.replaceState(
			{ ...history.state, locale: lang },
			'',
			replaceLocaleInUrl($page.url, lang),
		);
	}

	$: unselectedLocale = locales.find((l) => l !== $locale)!;
</script>

<svelte:window on:popstate={handlePopStateEvent} />

<a
	data-sveltekit-reload
	href={`${replaceLocaleInUrl($page.url, unselectedLocale)}`}
	on:click={() => {
		document.cookie = `${PREF_LOCALE}=${unselectedLocale}; path=/; max-age=31536000`;
	}}
>
	{LOCALE_LABELS[unselectedLocale]}
</a>
