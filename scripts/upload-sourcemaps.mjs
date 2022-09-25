#!/usr/bin/env zx
import 'zx/globals';

console.log({ argv });

const releaseOnly = argv['release-only'];
const sourcemapsOnly = argv['sourcemaps-only'];

const manualVersion = argv.version;
const fallbackVersion = await $`jq -r .version package.json`;

const version = manualVersion || fallbackVersion.toString().trim();

console.log({ version });

const org = ['--org', 'aqaratech'];
let project;
let dir;

const cwd = process.cwd();
console.log({ cwd });
if (cwd.endsWith('site')) {
	console.log(chalk.blue('In site directory'));
	project = ['--project', 'site-client', '--project', 'site-server'];
	dir = 'build';
} else if (process.cwd().endsWith('backend')) {
	console.log(chalk.blue('In backend directory'));
	project = ['--project', 'backend'];
	dir = 'dist';
} else {
	console.log(chalk.red('Not in site or backend directory.'));
	await $`exit 1`;
}

if (releaseOnly) {
	await $`sentry-cli releases new ${version} ${org} ${project} --finalize`;
} else if (sourcemapsOnly) {
	await $`sentry-cli sourcemaps upload ./build/ ${org} ${project} --release ${version}`;
} else {
	await $`sentry-cli releases new ${version} ${org} ${project} --finalize`;
	await $`sentry-cli sourcemaps upload ./build/ ${org} ${project} --release ${version}`;
}
