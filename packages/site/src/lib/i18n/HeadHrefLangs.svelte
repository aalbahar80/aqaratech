<script lang="ts">
	import { page } from '$app/stores';

	import { replaceLocaleInUrl } from './replace-local-url';

	import { locales, baseLocale } from '$i18n/i18n-util';
</script>

{#each locales as l}
	<link
		rel="alternate"
		hreflang={l}
		href={`${replaceLocaleInUrl($page.url, l, true)}`}
	/>
{/each}
<link
	rel="alternate"
	hreflang="x-default"
	href={`${replaceLocaleInUrl($page.url, baseLocale, true)}`}
/>
