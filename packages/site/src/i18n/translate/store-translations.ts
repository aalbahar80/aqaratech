import {
	storeTranslationToDisk,
	type ImportLocaleMapping,
} from 'typesafe-i18n/importer';

import type { BaseLocale } from '$i18n/i18n-types';

/** Takes arabic translations in the form of an object and stores them in the
 * typesafe-i18n format. Script that import this function should be run from the
 * root site directory, otherwise typesafe-i18n will save the translations to
 * the wrong directory.
 *
 * Possible workaround: https://github.com/google/zx#cwd
 *
 * Ex. `pnpm run i18n:import` */
export const storeTranslations = async (data: BaseLocale) => {
	const localeMapping: ImportLocaleMapping = {
		locale: 'ar',
		translations: data,
	};

	const result = await storeTranslationToDisk(localeMapping);

	console.log(`translations imported for locale '${result ?? ''}'`);
};
