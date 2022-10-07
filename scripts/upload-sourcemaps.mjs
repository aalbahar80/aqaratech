#!/usr/bin/env zx

console.log({ argv });
const TIMER = 'upload-sourcemaps.mjs';
console.time(TIMER);

const environment = argv['environment'];

const manualVersion = argv['version'];
const fallbackVersion = await $`jq -r .version package.json`;

const version = manualVersion || fallbackVersion.toString().trim();

console.log({ version });

const org = ['--org', 'aqaratech'];
let project;
let dir;

const cwd = process.cwd();
console.log({ cwd });

/**
 * Since Sentry releases are global per organization, we add a prefix to the release name.
 * https://docs.sentry.io/product/cli/releases/
 */
let prefixedVersion = '';

if (cwd.endsWith('site')) {
	console.log(chalk.blue('In site directory'));
	project = ['--project', 'site-client', '--project', 'site-server'];
	prefixedVersion = `site-${version}`;

	dir = 'build';
} else if (process.cwd().endsWith('backend')) {
	console.log(chalk.blue('In backend directory'));
	project = ['--project', 'backend'];
	prefixedVersion = `backend-${version}`;
	dir = 'dist';
} else {
	console.log(chalk.red('Not in site or backend directory.'));
	await $`exit 1`;
}

await $`sentry-cli releases new ${prefixedVersion} ${org} ${project} --finalize`;
console.timeLog(TIMER, 'Created release');

await $`sentry-cli sourcemaps upload ${dir} ${org} ${project} --release ${prefixedVersion}`;
console.timeLog(TIMER, 'sourcemaps uploaded');

// Use sentry commit tracking. This will automatically associate commits with releases. AKA `suspect commits`.
await $`sentry-cli releases set-commits --auto ${prefixedVersion} ${org} ${project}`;
console.timeLog(TIMER, 'commits associated');

// Create a new release deployment. This tells Sentry that a new release is being deployed to an environment. We can also add a URL herer.
const envName = {
	dev: 'staging',
	prod: 'production',
};

// @ts-expect-error Limited type safety here.
await $`sentry-cli releases deploys ${prefixedVersion} new -e ${envName[environment]} ${org} ${project}`;
console.timeLog(TIMER, 'deployment created');
