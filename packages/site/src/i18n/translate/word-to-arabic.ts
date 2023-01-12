#!/usr/bin/env -S tsx

import 'zx/globals';

import type { TranslatePy } from './translate-py.type';

/** translate a word from English to Arabic */
export async function wordToArabic(str: string) {
	// shell command: translatepy translate --source-lang english --dest-lang arabic --text mytext

	const result =
		await $`translatepy translate --source-lang english --dest-lang arabic --text ${str}`;

	// parse the json object and return the translation
	const parsed = JSON.parse(result.stdout) as TranslatePy;

	return parsed.result;
}
