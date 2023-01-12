import { isArabic } from './is-arabic';
import { wordToArabic } from './word-to-arabic';

import type { BaseTranslation } from 'typesafe-i18n';

// Example: ./translate.ts --source ./ar.json --output ./ar-translated.json
// If no output file is specified, the source file will be overwritten.

async function translateObject(obj: Record<string, unknown>) {
	// Recursively translate all strings in the object. Use a method that works well with async/await. For each value, call await translateString(value). Then return the object with all the values translated.

	if (typeof obj === 'object') {
		for (const key in obj) {
			const value = obj[key];
			if (typeof value === 'string') {
				obj[key] = await translateString(value);
			} else if (value && typeof value === 'object') {
				obj[key] = await translateObject(value as Record<string, unknown>);
			}
		}
	}

	return obj;
}

async function translateString(str: string) {
	if (isArabic(str)) {
		return str;
	} else {
		const translated = await wordToArabic(str);

		console.log({
			original: str,
			translated,
		});

		return translated;
	}
}

/** Recursively translate all values in a json file from English to Arabic. */
export const translatepy = async ({
	source,
	output,
}: {
	source: string;
	output?: string;
}) => {
	const ar = (await fs.readJson(source)) as BaseTranslation;

	// @ts-expect-error not needed yet
	const result = await translateObject(ar);

	await fs.writeJson(output ?? source, result);
};
