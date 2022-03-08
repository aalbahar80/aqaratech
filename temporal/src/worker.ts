import { Worker, Core } from '@temporalio/worker';
// TODO remove .js extension?
import { createActivities } from './activities.js';
import { URL } from 'url';
import path from 'path';
import pkg from '@prisma/client';

const { PrismaClient } = pkg;
const prismaClient = new PrismaClient({});

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
		taskQueue: 'hello-world',
		activities: createActivities(prismaClient),
	});

	await worker.run();
}
