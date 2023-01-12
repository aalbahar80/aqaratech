#!/usr/bin/env -S tsx
import { dirname, join } from 'node:path';

import { config } from 'dotenv';
import 'zx/globals';

const moduleDir = dirname(new URL(import.meta.url).pathname);

// Initiate dotenv
config({
	path: join(moduleDir, '../../../../../.env'),
});

// loads .env, creates generated directory, and checks if TOLGEE_KEY is valid
await $`${join(moduleDir, './tolgee-prepare.ts')}`;

const OUTPUT_FILE = `${moduleDir}/generated/i18n-output.json`;

/** Grab latest translations from Tolgee API. Saves them in a JSON file. */
export const sendToTolgee = async () => {
	await $`echo "Sending latest translations to Tolgee API..."`;

	const url = 'https://app.tolgee.io/v2/projects/import';

	const formData = new FormData();

	const fileBlob = new Blob([await fs.readFile(OUTPUT_FILE)], {
		type: 'application/json',
	});

	formData.append('files', fileBlob, 'i18n-output.json');

	const key = process.env['TOLGEE_KEY'];

	if (!key) {
		throw new Error('TOLGEE_KEY is not set');
	}

	const res = await fetch(url, {
		method: 'POST',
		headers: { 'X-API-Key': key },
		body: JSON.stringify({ files: [OUTPUT_FILE] }),
	});

	const data: unknown = await res.json();

	console.log({
		status: res.status,
		data,
	});

	if (!res.ok) {
		process.exit(1);
	}
};

await sendToTolgee();
