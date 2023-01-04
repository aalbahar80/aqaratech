import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { inspect } from 'util';

import { defu } from 'defu';
import {
	storeTranslationToDisk,
	type ImportLocaleMapping,
} from 'typesafe-i18n/importer';

import en from '../en/index';

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
	) as Record<string, unknown>;

	console.log(inspect(ar, false, 999, true));

	const merged = addMissingTranslations(ar);

	return merged;
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

/** Use english as fallback for missing translations */
const addMissingTranslations = (ar: Record<string, unknown>) => {
	// count number of missing translations
	// @ts-expect-error - ignore
	const missing = recurseKeys(en) - recurseKeys(ar);

	console.log(`\n\n--- MISSING TRANSLATIONS COUNT: ${missing} ---\n\n`);

	return defu(ar, en);
};

/** Recursively count number of keys in object */
const recurseKeys = (obj: Record<string, unknown>): number =>
	Object.keys(obj).reduce((acc, curr) => {
		if (typeof obj[curr] === 'object')
			return ++acc + recurseKeys(obj[curr] as Record<string, unknown>);
		else return ++acc;
	}, 0);

await importTranslationsForLocale('ar');
