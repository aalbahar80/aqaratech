import type { RequestHandler } from '@sveltejs/kit';
import { Connection, WorkflowClient } from '@temporalio/client';
import { leaseWF } from '../../../../temporal/lib/workflows.js';

export const get: RequestHandler = async ({ params }) => {
	const { id } = params;
	if (!id) {
		const error = new Error('Unable to get leaseId from URL');
		throw error;
	}
	console.log('starting Lease Workflow for lease: ', id);

	const connection = new Connection({
		address: 'temporal.letand.be',
	});
	const client = new WorkflowClient(connection.service);

	await client.start(leaseWF, {
		workflowId: id,
		taskQueue: 'hello-world',
		args: [id],
	});

	return {
		status: 200,
		body: { message: 'LeaseWF started' },
	};
};
