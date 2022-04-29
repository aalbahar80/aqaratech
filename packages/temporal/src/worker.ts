import pkg from "@prisma/client";
import {
	DefaultLogger,
	NativeConnection,
	Runtime,
	Worker,
} from "@temporalio/worker";
import { extname } from "path";
import { URL } from "url";
// TODO remove .js extension?
import { createActivities } from "./activities.js";

const { PrismaClient } = pkg;
const prismaClient = new PrismaClient({});

run().catch((err) => console.log(err));

async function run() {
	const logger = new DefaultLogger("DEBUG");
	Runtime.install({
		logger,
		telemetryOptions: { logForwardingLevel: "INFO" },
	});

	// Support running both complied code and ts-node/esm loader
	const workflowsPath = new URL(
		`./workflows${extname(import.meta.url)}`,
		import.meta.url
	).pathname;

	const connection = await NativeConnection.create({
		address: "temporal.letand.be",
	});
	const worker = await Worker.create({
		connection,
		workflowsPath, // passed to Webpack for bundling
		taskQueue: "hello-world",
		activities: createActivities(prismaClient),
	});

	await worker.run();
}
