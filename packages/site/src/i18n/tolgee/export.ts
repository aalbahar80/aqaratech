import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { inspect } from 'util';

import {
	readTranslationFromDisk,
	type ExportLocaleMapping,
} from 'typesafe-i18n/exporter';

// Get the directory containing the current module
const moduleDir = dirname(new URL(import.meta.url).pathname);

/** The file to upload to the API */
const outputPath = join(moduleDir, './generated/i18n-output.json');

/** Send all translations to Tolgee API */
const sendDataToAPI = (exportMapping: ExportLocaleMapping) => {
	console.log(inspect(exportMapping, false, 999, true));

	// Save translations to file
	writeFileSync(
		outputPath,
		JSON.stringify(exportMapping.translations, null, 2),
	);

	// Construct the absolute path to the bash script
	const verify = join(moduleDir, './tolgee-verify-key.sh');
	const send = join(moduleDir, './tolgee-send.sh');

	// Verify the Tolgee API key
	const verifyResult = execSync(verify);
	console.log(verifyResult.toString());

	// Send the translations to Tolgee API
	const sendResult = execSync(send);
	console.log(sendResult.toString());
};

const exportTranslationsForLocale = async (locale: string) => {
	const mapping = await readTranslationFromDisk(locale);

	sendDataToAPI(mapping);
};

await exportTranslationsForLocale('en');
