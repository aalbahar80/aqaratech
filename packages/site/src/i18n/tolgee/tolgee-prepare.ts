#!/usr/bin/env -S tsx
import { dirname, join } from 'node:path';

import { config } from 'dotenv';
import 'zx/globals';

const moduleDir = dirname(new URL(import.meta.url).pathname);

// Initiate dotenv
config({
	path: join(moduleDir, '../../../../../.env'),
});

const TOLGEE_KEY = process.env['TOLGEE_KEY'];

// Check if TOLGEE_KEY is set
if (!TOLGEE_KEY) {
	await $`echo "TOLGEE_KEY not found."`;
	await $`exit 1`;
	throw new Error('TOLGEE_KEY not found.');
}

// Check if TOLGEE_KEY is valid
const res = await fetch('https://app.tolgee.io/v2/api-keys/current', {
	headers: {
		'X-API-Key': TOLGEE_KEY,
	},
});

if (!res.ok) {
	await $`echo "TOLGEE_KEY is invalid."`;
	await $`exit 1`;
	throw new Error('TOLGEE_KEY is invalid.');
}

// Create generated directory if it doesn't exist
// suppress error if directory already exists
const generatedDir = join(moduleDir, './generated');

await $`ls ${generatedDir} || mkdir ${generatedDir}`;
