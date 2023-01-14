#!/usr/bin/env -S tsx

// Run with `pnpm run i18n:export`
// --lang: language to export
// --skip-send: Don't send to Tolgee API, only generate the file

import { dirname, join } from 'node:path';

import { config } from 'dotenv';
import { readTranslationFromDisk } from 'typesafe-i18n/exporter';
import 'zx/globals';

import { i18n_OUTPUT } from './constants';

import type { Locales } from '$i18n/i18n-types';

console.log({ argv });

const args = argv as unknown as {
	'skip-send'?: boolean;
	lang: Locales;
};

const moduleDir = dirname(new URL(import.meta.url).pathname);

// Initiate dotenv
// Needs to be done from parent script
config({
	path: join(moduleDir, '../../../../../.env'),
});

// Save translations to file
const mapping = await readTranslationFromDisk(args.lang);
await fs.writeJson(
	join(moduleDir, `../tolgee/generated/${args.lang}-${i18n_OUTPUT}`),
	mapping,
	{ spaces: 2 },
);

if (args['skip-send']) {
	console.log('Skipping sending to Tolgee API');
	process.exit(0);
}

await $`echo "Sending to Tolgee API..."`;

const prep = join(moduleDir, '../tolgee/tolgee-prepare.ts');
await $`${prep}`;

// Grab tolgee translations
const send = join(moduleDir, '../tolgee/tolgee-send.ts');
await $`${send}`;
