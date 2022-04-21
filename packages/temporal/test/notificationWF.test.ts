import pkg from "@prisma/client";
import {
	ActivityFailure,
	ApplicationFailure,
	WorkflowClient,
	WorkflowFailedError,
} from "@temporalio/client";
import { DefaultLogger, Runtime, Worker } from "@temporalio/worker";
import assert from "assert";
import axios from "axios";
import path from "path";
import sinon from "sinon";
import { v4 } from "uuid";
import {
	afterAll,
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	it,
} from "vitest";
import { createActivities } from "../lib/activities";
import { trxNotificationWF } from "../lib/workflows";

const { PrismaClient } = pkg;
const prismaClient = new PrismaClient({});

describe("example workflow", function () {
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

		const worker = await Worker.create({
			taskQueue: "hello-world",
			workflowsPath,
			activities: createActivities(prismaClient),
		});

		const runPromise = worker.run();
		shutdown = async () => {
			worker.shutdown();
			await runPromise;
		};
	}, 1000000);

	beforeEach(() => {
		const client = new WorkflowClient();

		// const testId = uuid();
		const testId = "05432ea6-3ae6-4915-a8e3-81440a4f78f3";
		execute = () =>
			client.execute(trxNotificationWF, {
				args: [testId, 0.000000001],
				taskQueue: "hello-world",
				workflowExecutionTimeout: 1000000,
				workflowId: `test-${v4()}`,
			});
	}, 1000000);

	afterAll(async () => {
		await shutdown();
	});

	afterEach(() => {
		sinon.restore();
	});

	it("returns correct result", async () => {
		const result = await execute();
		console.log({ result }, "wf2.test.ts ~ 78");
		assert.equal(result, "The answer is 42");
	}, 1000000);

	// it("retries one failure", async () => {
	// 	// Make the first request fail, but subsequent requests succeed
	// 	let numCalls = 0;
	// 	sinon.stub(axios, "get").callsFake(() => {
	// 		if (numCalls++ === 0) {
	// 			return Promise.reject(new Error("first error"));
	// 		}
	// 		return Promise.resolve({ data: { args: { answer: "88" } } });
	// 	});

	// 	const result = await execute();
	// 	assert.equal(result, "The answer is 88");
	// });

	// it("bubbles up activity errors", async () => {
	// 	sinon
	// 		.stub(axios, "get")
	// 		.callsFake(() => Promise.reject(new Error("example error")));

	// 	await assert.rejects(
	// 		execute,
	// 		(err: unknown) =>
	// 			err instanceof WorkflowFailedError &&
	// 			err.cause instanceof ActivityFailure &&
	// 			err.cause.cause instanceof ApplicationFailure &&
	// 			err.cause.cause.message === "example error"
	// 	);
	// });
});
