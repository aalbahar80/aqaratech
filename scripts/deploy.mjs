#!/usr/bin/env zx

console.log({ argv });

/**
 * @type {string | undefined}
 */
let siteVersion = undefined;

/**
 * @type {string | undefined}
 */
let backendVersion = undefined;

if (
	typeof argv['site-version'] === 'string' &&
	argv['site-version'].length > 0
) {
	siteVersion = argv['site-version'];
}

if (
	typeof argv['backend-version'] === 'string' &&
	argv['backend-version'].length > 0
) {
	backendVersion = argv['backend-version'];
}

const appName = argv['app-name'];

const SPEC = 'app.yml';
// get app id
console.log(chalk.blue(`Getting app ${appName} info...`));

const allApps = await $`doctl apps list --format ID,Name --output json`;

// @ts-expect-error zx will automatically use stdout and trim the new line. https://github.com/google/zx#processoutput
const app = JSON.parse(allApps).find(
	(/** @type {{ spec: { name: string; }; }} */ app) =>
		app.spec.name === appName,
);

let appId = '';
let WILL_CREATE = false;
let latestSpec;
if (!app) {
	WILL_CREATE = true;
	console.log(chalk.red(`App ${appName} not found.`));

	// error if no siteVersion or backendVersion
	if (!siteVersion || !backendVersion) {
		console.log(chalk.red(`No siteVersion or backendVersion provided.`));
		console.log(chalk.red(`Cannot create new app without versions.`));
		await $`exit 1`;
	}

	// If app does not yet exist, use the spec.yml file as a base.
	latestSpec = YAML.parse(await fs.readFile('.do/spec.yml', 'utf8'));
	latestSpec.name = appName;
} else {
	console.log(chalk.green(`Found App. Name: ${appName} ID: ${appId} .`));

	appId = app.id;
	// If app already exists, get the latest spec as a base.
	console.log(chalk.blue(`Getting latest spec for app ${appName}...`));
	await $`doctl apps spec get ${appId} > ${SPEC}`;
	latestSpec = YAML.parse(await fs.readFile(SPEC, 'utf8'));
}

// bump versions in spec
console.log(chalk.blue(`Bumping versions...`));

let siteUnchanged = false;
let backendUnchanged = false;

latestSpec.services.forEach(
	(/** @type {{ name: string; image: { tag: string; }; }} */ service) => {
		// Only bump versions when a version is specified.
		if (siteVersion && service.name === 'site') {
			siteUnchanged = siteVersion !== service.image.tag;
			console.log(
				chalk.green(`Bumping site from ${service.image.tag} to ${siteVersion}`),
			);
			service.image.tag = siteVersion;
		} else if (backendVersion && service.name === 'backend') {
			backendUnchanged = backendVersion !== service.image.tag;
			console.log(
				chalk.green(
					`Bumping backend from ${service.image.tag} to ${backendVersion}`,
				),
			);
			service.image.tag = backendVersion;
		}
	},
);

// if docker container tag hasn't changed, force a rebuild and exit
if (siteUnchanged && backendUnchanged) {
	console.log(
		chalk.yellow(
			`No version changes detected. Forcing rebuild without updating spec...`,
		),
	);

	// Create a new deployment with the `--force-rebuild` flag to ensure latest version of the container is pulled.
	await $`doctl apps create-deployment ${appId} --force-rebuild`;

	process.exit(0);
}

// save spec
console.log(chalk.blue(`Saving spec...`));
await fs.writeFile(SPEC, YAML.stringify(latestSpec));
console.log(latestSpec);

// deploy
console.log(chalk.blue(`Deploying...`));

if (WILL_CREATE) {
	// Create new app
	await $`doctl apps create --spec ${SPEC} --output json`;
} else if (appId) {
	// Update existing app
	await $`doctl apps update ${appId} --spec ${SPEC} --output json`;
}
