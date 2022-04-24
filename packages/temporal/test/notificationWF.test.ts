import pkg from "@prisma/client";
import { Connection, WorkflowClient } from "@temporalio/client";
import {
	DefaultLogger,
	NativeConnection,
	Runtime,
	Worker,
} from "@temporalio/worker";
import ms from "ms";
import path from "path";
import sinon from "sinon";
import { v4 } from "uuid";
import {
	afterAll,
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
} from "vitest";
import { createActivities } from "../lib/activities";
import { trxNotificationWF } from "../lib/workflows";

const { PrismaClient } = pkg;
const prismaClient = new PrismaClient({});

describe("example workflow", function () {
	// TODO: How to make sure that worker & server are running?
	let shutdown: () => Promise<void>;
	let execute: () => ReturnType<typeof trxNotificationWF>;

	beforeAll(async function () {
		// Filter INFO log messages for clearer test output
		Runtime.install({ logger: new DefaultLogger("WARN") });

		// Support running both complied code and ts-node/esm loader
		const workflowsPath = new URL(
			`../src/workflows${path.extname(import.meta.url)}`,
			import.meta.url
		).pathname;

		const connection = await NativeConnection.create({
			address: "temporal.letand.be",
		});

		const worker = await Worker.create({
			connection,
			taskQueue: "hello-world",
			workflowsPath,
			activities: createActivities(prismaClient),
		});

		const runPromise = worker.run();
		shutdown = async () => {
			worker.shutdown();
			await runPromise;
		};
	}, ms("20s"));

	beforeEach(() => {
		const connection = new Connection({
			address: "temporal.letand.be",
		});
		const client = new WorkflowClient(connection.service);

		const testId = "05432ea6-3ae6-4915-a8e3-81440a4f78f3";
		execute = () =>
			client.execute(trxNotificationWF, {
				args: [testId, 0.00000000001],
				taskQueue: "hello-world",
				workflowExecutionTimeout: ms("20s"),
				workflowId: `test-${v4()}`,
			});
	}, ms("20s"));

	afterAll(async () => {
		await shutdown();
	});

	afterEach(() => {
		sinon.restore();
	});

	it(
		"Generates at least one notification",
		async () => {
			const result = await execute();
			const successful = result.filter(
				(r) => r.errorMessage === null && r.status === "queued"
			);
			expect(successful.length).toBeGreaterThanOrEqual(1);
		},
		ms("20s")
	);

	it(
		"Generates notifications without errors",
		async () => {
			const result = await execute();
			result.map((r) =>
				expect(r).toMatchObject({
					status: "queued",
					errorMessage: null,
				})
			);
		},
		ms("20s")
	);
});
