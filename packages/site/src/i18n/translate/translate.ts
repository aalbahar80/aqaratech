#!/usr/bin/env -S tsx

import 'zx/globals';

import { isArabic } from './is-arabic';
import { wordToArabic } from './word-to-arabic';

async function translateObject(obj: Record<string, unknown>) {
	for (const key in obj) {
		obj[key] = await translateString(obj[key]);
	}

	return obj;
}

async function translateString(str: string) {
	if (isArabic(str)) {
		return str;
	} else {
		return await wordToArabic(str);
	}
}

// const en = { next: 'Next', previous: 'Previous', all: 'All' };
const en = { next: 'Next' };
// const ar = { next: 'التالي' };

const result = translateObject(en);

console.log(result);
