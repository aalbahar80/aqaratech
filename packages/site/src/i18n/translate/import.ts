import {
	storeTranslationToDisk,
	type ImportLocaleMapping,
} from 'typesafe-i18n/importer';

import type { BaseLocale } from '$i18n/i18n-types';

/** Takes arabic translations in the form of an object and stores
 * them in the typesafe-i18n format */
export const storeTranslations = async (data: BaseLocale) => {
	const localeMapping: ImportLocaleMapping = {
		locale: 'ar',
		translations: data,
		namespaces: ['my-namespace'],
	};

	const result = await storeTranslationToDisk(localeMapping);

	console.log(`translations imported for locale '${result ?? ''}'`);
};
