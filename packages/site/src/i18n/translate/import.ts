#!/usr/bin/env -S tsx

// Run with `pnpm run i18n:import`

import { dirname, join } from 'node:path';

import { config } from 'dotenv';
import 'zx/globals';

import { addMissingTranslations } from './add-missing-translations';
import { storeTranslations } from './store-translations';
import { translatepy } from './translate';

console.log({ argv });

const args = argv as unknown as {
	tolgee: boolean;
};

const moduleDir = dirname(new URL(import.meta.url).pathname);

// Initiate dotenv
// Needs to be done from parent script
config({
	path: join(moduleDir, '../../../../../.env'),
});

if (args.tolgee) {
	const prep = join(moduleDir, '../tolgee/tolgee-prepare.ts');
	await $`${prep}`;

	// Grab tolgee translations
	const get = join(moduleDir, '../tolgee/tolgee-get.ts');
	await $`${get}`;
}

// Handle missing translations
await addMissingTranslations({
	arFile: join(moduleDir, '../tolgee/generated/ar.json'),
	enFile: join(moduleDir, '../tolgee/generated/en.json'),
});

// Use translatepy to translate missing keys
await translatepy({
	source: join(moduleDir, '../tolgee/generated/ar.json'),
});

// Store translations to typesafe-i18n
const arJsonPath = join(moduleDir, '../tolgee/generated/ar.json');
const data: unknown = await fs.readJson(arJsonPath);
console.log(data);

// @ts-expect-error no way to verify this
await storeTranslations(data);

// Format
await $`prettier --write ${join(moduleDir, '../ar')}`;
await $`prettier --write ${join(moduleDir, '../tolgee/generated')}`;
