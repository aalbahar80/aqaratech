#!/usr/bin/env -S tsx

// Run with `pnpm run i18n:export`
// --skip-send: Don't send to Tolgee API, only generate the file

import { dirname, join } from 'node:path';

import { config } from 'dotenv';
import { readTranslationFromDisk } from 'typesafe-i18n/exporter';
import 'zx/globals';

console.log({ argv });

const moduleDir = dirname(new URL(import.meta.url).pathname);

// Initiate dotenv
// Needs to be done from parent script
config({
	path: join(moduleDir, '../../../../../.env'),
});

// Save translations to file
const mapping = await readTranslationFromDisk('en');
await fs.writeJson(
	join(moduleDir, '../tolgee/generated/i18n-output.json'),
	mapping.translations,
	{ spaces: 2 },
);

if (argv['skip-send']) {
	console.log('Skipping sending to Tolgee API');
	process.exit(0);
}

await $`echo "Sending to Tolgee API..."`;

const prep = join(moduleDir, '../tolgee/tolgee-prepare.ts');
await $`${prep}`;

// Grab tolgee translations
const send = join(moduleDir, '../tolgee/tolgee-send.ts');
await $`${send}`;
