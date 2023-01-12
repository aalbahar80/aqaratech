#!/usr/bin/env -S tsx
/* eslint-disable turbo/no-undeclared-env-vars */

import { dirname, join } from 'node:path';

import 'zx/globals';

const moduleDir = dirname(new URL(import.meta.url).pathname);

// loads .env, creates generated directory, and checks if TOLGEE_KEY is valid
await $`${join(moduleDir, './tolgee-prepare.ts')}`;

const ZIP_FILE = `${moduleDir}/generated/data.zip`;

/** Grab latest translations from Tolgee API. Saves them in a JSON file. */
export const fetchTolgeeJSON = async () => {
	await $`echo "Fetching latest translations from Tolgee API..."`;

	await $`curl https://app.tolgee.io/api/project/export/jsonZip?ak=$TOLGEE_KEY --output ${ZIP_FILE}`;

	await $`echo "Unzipping..."`;
	await $`unzip -o ${ZIP_FILE} -d ${moduleDir}/generated`;
	await $`echo "Done. Translations saved to ${moduleDir}/generated."`;

	await $`echo "Cleaning up..."`;
	await $`rm ${ZIP_FILE}`;
};

await fetchTolgeeJSON();
