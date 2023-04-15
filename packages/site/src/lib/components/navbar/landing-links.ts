import type L from '$i18n/i18n-svelte';
import type { ReadableOf } from '$lib/utils/readable-of';

export const landingLinks = (LL: ReadableOf<typeof L>) => [
	{
		label: LL.nav.features(),
		href: '#features',
	},
	{
		label: LL.landing.pricing.title(),
		href: '#pricing',
	},
];
