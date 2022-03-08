import type { RequestHandler } from '@sveltejs/kit';
import { Connection, WorkflowClient } from '@temporalio/client';
import { leaseWF } from '../../../temporal/lib/workflows.js';

export const get: RequestHandler = async ({ url }) => {
	const leaseId = url.searchParams.get('leaseId');
	if (!leaseId) {
		const error = new Error('Unable to get leaseId from URL');
		throw error;
	}
	console.log('starting Lease Workflow for lease: ', leaseId);

	const connection = new Connection({
		address: 'temporal.letand.be',
	});
	const client = new WorkflowClient(connection.service);

	await client.start(leaseWF, {
		workflowId: leaseId,
		taskQueue: 'hello-world',
		args: [leaseId],
	});

	return {
		status: 200,
		body: { message: 'LeaseWF started' },
	};
};
