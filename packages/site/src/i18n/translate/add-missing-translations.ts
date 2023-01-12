import { inspect } from 'util';

import defu from 'defu';
import 'zx/globals';

import type { BaseTranslation } from '$i18n/i18n-types';

/** Add missing translations to arabic translation file, uses English as fallback. */
export const addMissingTranslations = async ({
	arFile,
	enFile,
}: {
	arFile: string;
	enFile: string;
}) => {
	const ar = (await fs.readJson(arFile)) as BaseTranslation;

	const en = (await fs.readJson(enFile)) as BaseTranslation;
	const result = mergeEnglish(ar, en);
	await fs.writeJson(arFile, result);
};

/** Use english as fallback for missing translations */
const mergeEnglish = (
	ar: Record<string, unknown>,
	en: Record<string, unknown>,
) => {
	// count number of missing translations
	const missing = recurseKeys(en) - recurseKeys(ar);

	console.log(`\n\n--- MISSING TRANSLATIONS COUNT: ${missing} ---\n\n`);

	const result = defu(ar, en);

	console.log(
		`\n\n--- Final result after adding missing translations: ---\n\n`,
	);

	console.log(inspect(result, false, 999, true));

	return result;
};

/** Recursively count number of keys in object */
const recurseKeys = (obj: Record<string, unknown>): number =>
	Object.keys(obj).reduce((acc, curr) => {
		if (typeof obj[curr] === 'object')
			return ++acc + recurseKeys(obj[curr] as Record<string, unknown>);
		else return ++acc;
	}, 0);
