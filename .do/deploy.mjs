#!/usr/bin/env zx

console.log({ argv });

const appName = argv["app-name"];
const siteVersion = argv["site-version"];
const backendVersion = argv["backend-version"];

const SPEC = "app.yml";
// get app id
console.log(chalk.blue(`Getting app ${appName} info...`));

const allApps = await $`doctl apps list --format ID,Name --output json`;
const app = JSON.parse(allApps).find((app) => app.spec.name === appName);

let appId = "";
let WILL_CREATE = false;
let latestSpec;
if (!app) {
	WILL_CREATE = true;
	console.log(chalk.red(`App ${appName} not found.`));
	// await $`zx .do/deploy-new.mjs --app-name ${appName} --site-version ${siteVersion} --backend-version ${backendVersion}`;
	// If app does not yet exist, use the spec.yml file as a base.
	latestSpec = YAML.parse(await fs.readFile(".do/spec.yml", "utf8"));
	latestSpec.name = appName;
} else {
	console.log(chalk.green(`Found App. Name: ${appName} ID: ${appId} .`));

	appId = app.id;
	// If app already exists, get the latest spec as a base.
	console.log(chalk.blue(`Getting latest spec for app ${appName}...`));
	await $`doctl apps spec get ${appId} > ${SPEC}`;
	latestSpec = YAML.parse(await fs.readFile(SPEC, "utf8"));
}

// bump versions in spec
console.log(chalk.blue(`Bumping versions...`));

latestSpec.services.forEach((service) => {
	if (service.name === "site") {
		service.image.tag = siteVersion;
	} else if (service.name === "backend") {
		service.image.tag = backendVersion;
	}
});

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

	// Create a new deployment because it's the only way to "Force rebuild".
	// Otherwise, sometimes the new image is not pulled. Could be because the image tag is the same (e.g. "latest").
	await $`doctl apps create-deployment ${appId} --force-rebuild`;
}
