#!/usr/bin/env -S tsx

import 'zx/globals';

import { translatepy } from './translate';

// Example: ./translate.ts --source ./ar.json --output ./ar-translated.json
// If no output file is specified, the source file will be overwritten.

console.log({ argv });

const args = argv as unknown as {
	source: string;
	output?: string;
};

if (!args.source) {
	console.log('Source file not specified');
	await $`exit 1`;
	throw new Error('Source file not specified');
}

await translatepy({ source: args.source, output: args.output ?? args.source });
