import type { PageLoad } from './$types';
import { get } from 'svelte/store';

// eslint-disable-next-line import/no-named-as-default
import LL, { setLocale } from '$i18n/i18n-svelte';

export const load: PageLoad = async ({ parent }) => {
	// wait for `+layout.ts` to load dictionary and pass locale information
	const { locale } = await parent();

	// if you need to output a localized string in a `load` function,
	// you always need to call `setLocale` right before you access the `LL` store
	setLocale(locale);
	// get the translation functions value from the store
	const $LL = get(LL);
	// DEBUG: rm
	console.info($LL.log({ fileName: '+page.ts' }));
	return {
		// DEBUG: rm
		title: $LL.buttons.search(),
	};
};
