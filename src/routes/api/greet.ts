import type { RequestHandler } from '@sveltejs/kit';
import { Connection, WorkflowClient } from '@temporalio/client';
import { dependencyWF } from '../../../temporal/src/workflows';
// import { SubscriptionWorkflow } from '../../../temporal/lib/workflows.js';

export const get: RequestHandler = async () => {
	console.log('greeting');
	const connection = new Connection({
		address: 'temporal.letand.be',
	});
	const client = new WorkflowClient(connection.service);

	const result = await client.execute(dependencyWF, {
		workflowId: 'dependency-injection',
		taskQueue: 'hello-world', // must match the taskQueue polled by Worker above
	});
    console.log(result)

	return {
		status: 200,
		body: {
			result,
		},
	};
};
