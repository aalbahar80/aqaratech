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
const site_server_project = ['--project', 'site-server'];
const site_client_project = ['--project', 'site-client'];

let project;

const cwd = process.cwd();

let projectName = undefined;

if (cwd.includes('packages/site')) {
	projectName = 'site';
} else if (cwd.includes('packages/backend')) {
	projectName = 'backend';
}

/**
 * Since Sentry releases are global per organization, we add a prefix to the release name.
 * https://docs.sentry.io/product/cli/releases/
 */
let prefixedVersion = '';

if (projectName === 'site') {
	// site settings

	console.log(chalk.blue('In site directory'));

	project = [...site_server_project, ...site_client_project];

	// the sourcemaps for the client bundle should be uploaded from the build/client directory.
	// This is a requirement to have sentry associate the sourcemaps with the correct file.

	prefixedVersion = `site-${version}`;
} else if (projectName === 'backend') {
	// backend settings
	console.log(chalk.blue('In backend directory'));

	project = ['--project', 'backend'];

	prefixedVersion = `backend-${version}`;
} else {
	console.log(chalk.red('Not in site or backend directory.'));

	await $`exit 1`;
}

// Create a new release
await $`sentry-cli releases new ${prefixedVersion} ${org} ${project} --finalize`;

console.timeLog(TIMER, 'Created release');

// Upload source maps
if (projectName === 'site') {
	// Upload client sourcemaps

	await $`sentry-cli sourcemaps upload build/client ${org} ${site_client_project} --release ${prefixedVersion}`;
	// alternative: sentry-cli releases files site-client-1.3.1 upload-sourcemaps ./build/client --org aqaratech --project site-client

	// Upload server sourcemaps

	// copy the build directory to a temporary directory
	await $`cp -r build build-temp`;
	// remove the client directory from the build-temp directory
	await $`rm -rf build-temp/client`;
	// flatten sourcemaps using sorcery
	await $`find build-temp -type f -name '*.js' -exec echo {} \\; | xargs -I % /bin/bash -c 'echo flattening sourcemap: %; pnpm sorcery -i %'`;
	// upload the server sourcemaps
	await $`sentry-cli sourcemaps upload build-temp ${org} ${site_server_project} --release ${prefixedVersion}`;
	// alternative: sentry-cli releases files site-server-1.3.1 upload-sourcemaps ./build/server --org aqaratech --project site-server
	// remove the temporary build directory
	await $`rm -rf build-temp`;
} else if (projectName === 'backend') {
	await $`sentry-cli sourcemaps upload dist ${org} ${project} --release ${prefixedVersion}`;
}

console.timeLog(TIMER, 'sourcemaps uploaded');

// Associate commits with the release
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
