<script lang="ts">
	import { page } from '$app/stores';

	import { replaceLocaleInUrl } from './replace-local-url';

	import { locale } from '$i18n/i18n-svelte';
	import { locales } from '$i18n/i18n-util';
	import { PREF_LOCALE } from '$lib/constants/misc';
	import { LOCALE_LABELS } from '$lib/i18n/locale-labels';

	$: unselectedLocale = locales.find((l) => l !== $locale)!;
</script>

<a
	data-sveltekit-reload
	href={`${replaceLocaleInUrl($page.url, unselectedLocale)}`}
	on:click={() => {
		document.cookie = `${PREF_LOCALE}=${unselectedLocale}; path=/; max-age=31536000`;
	}}
>
	{LOCALE_LABELS[unselectedLocale]}
</a>
