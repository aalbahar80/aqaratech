import { Worker } from '@temporalio/worker';
import * as activities from './activities.js';
import { URL } from 'url';
import path from 'path';

run().catch((err) => console.log(err));

async function run() {
	// Support running both complied code and ts-node/esm loader
	const workflowsPath = new URL(
		`./workflows${path.extname(import.meta.url)}`,
		import.meta.url,
	).pathname;
    console.log('workflows path below --------------------')
    console.log(workflowsPath);

	const worker = await Worker.create({
		workflowsPath, // passed to Webpack for bundling
		activities, // directly imported in Node.js
		taskQueue: 'hello-world',
	});

	await worker.run();
}
