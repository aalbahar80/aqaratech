#!/usr/bin/env zx

import "zx/globals";

console.log({ argv });

const appName = argv["app-name"];
const siteVersion = argv["site-version"];
const backendVersion = argv["backend-version"];

const SPEC = "app.yml";

// get app id
console.log(chalk.blue(`Getting app ${appName} info...`));

const allApps = await $`doctl apps list --format ID,Name --output json`;
const app = JSON.parse(allApps).find((app) => app.spec.name === appName);

if (!app) {
	console.log(chalk.red(`App ${appName} not found.`));
	await $`exit 1`;
}

const appId = app.id;

// console.log({ app });
console.log(chalk.blue(`App ${appName} id: ${appId}`));

// get latest spec
console.log(chalk.blue(`Getting latest spec for app ${appName}...`));
await $`doctl apps spec get ${appId} > ${SPEC}`;
const latestSpec = YAML.parse(await fs.readFile(SPEC, "utf8"));
console.log(latestSpec);

// bump versions
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

// deploy
console.log(chalk.blue(`Deploying...`));
await $`doctl apps update ${appId} --spec ${SPEC} --output json`;

// Create a new deployment because it's the only way to "Force rebuild".
// Otherwise, sometimes the new image is not pulled. Could be because the image tag is the same (e.g. "latest").
await $`doctl apps create-deployment ${appId} --force-rebuild`;
