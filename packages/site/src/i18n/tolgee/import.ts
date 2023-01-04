import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { inspect } from 'util';

import {
	storeTranslationToDisk,
	type ImportLocaleMapping,
} from 'typesafe-i18n/importer';

import type { Locales } from '../../i18n/i18n-types';
import type { BaseTranslation } from 'typesafe-i18n';

// Get the directory containing the current module
const moduleDir = dirname(new URL(import.meta.url).pathname);

/** Get latest translations from Tolgee API */
const getDataFromAPI = (): BaseTranslation => {
	const verify = join(moduleDir, './tolgee-verify-key.sh');
	const get = join(moduleDir, './tolgee-get.sh');

	// Verify the Tolgee API key
	const verifyResult = execSync(verify);
	console.log(verifyResult.toString());

	// Get the translations from Tolgee API
	const getResult = execSync(get);
	console.log(getResult.toString());

	// load translations from file
	const arTranslations = join(moduleDir, './generated/ar.json');
	const ar = JSON.parse(
		readFileSync(arTranslations, { encoding: 'utf-8' }),
	) as BaseTranslation;

	console.log(inspect(ar, false, 999, true));

	return ar;
};

const importTranslationsForLocale = async (locale: Locales) => {
	const translations = getDataFromAPI();

	const localeMapping: ImportLocaleMapping = {
		locale,
		translations,
		namespaces: ['my-namespace'],
	};

	const result = await storeTranslationToDisk(localeMapping);

	console.log(`translations imported for locale '${result ?? ''}'`);
};

await importTranslationsForLocale('ar');
