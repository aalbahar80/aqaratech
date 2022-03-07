import { Worker, Core } from '@temporalio/worker';
import * as activities from './activities.js';
import { URL } from 'url';
import path from 'path';

run().catch((err) => console.log(err));

async function run() {
	await Core.install({
		serverOptions: {
		address: 'temporal.letand.be',
		},
	});
	// Support running both complied code and ts-node/esm loader
	const workflowsPath = new URL(
		`./workflows${path.extname(import.meta.url)}`,
		import.meta.url,
	).pathname;

	const worker = await Worker.create({
		workflowsPath, // passed to Webpack for bundling
		activities, // directly imported in Node.js
		taskQueue: 'hello-world',
	});

	await worker.run();
}
