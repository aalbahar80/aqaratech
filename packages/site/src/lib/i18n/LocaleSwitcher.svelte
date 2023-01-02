<script lang="ts">
	import { setLocale, locale } from '$i18n/i18n-svelte';
	import { locales } from '$i18n/i18n-util';
	import { loadLocaleAsync } from '$i18n/i18n-util.async';

	import { LOCALE_LABELS } from './locale-labels';

	import type { Locales } from '$i18n/i18n-types';

	const switchLocale = async (newLocale: Locales) => {
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
	};

	$: unselectedLocale = locales.find((l) => l !== $locale);
</script>

{#if unselectedLocale}
	<button
		on:click={() => {
			// @ts-expect-error svelte type limitation
			void switchLocale(unselectedLocale);
		}}
	>
		{LOCALE_LABELS[unselectedLocale]}
	</button>
{/if}
