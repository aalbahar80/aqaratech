import type { RequestHandler } from '@sveltejs/kit';
import { Connection, WorkflowClient } from '@temporalio/client';
// import { getBillingPeriod } from '../../../../temporal/lib/workflows.js';
import { getBillingPeriod } from '../../../../temporal/src/workflows';

export const get: RequestHandler = async ({ params }) => {
	const { id } = params;
	if (!id) {
		const error = new Error('Unable to get leaseId from URL');
		throw error;
	}
	console.log('getting current billing period for lease: ', id);

	const connection = new Connection({
		address: 'temporal.letand.be',
	});
	const client = new WorkflowClient(connection.service);
	const handle = client.getHandle(id);

	const currentBp = await handle.query(getBillingPeriod);
	console.log(`The current billing period is ${currentBp}`);

	return {
		status: 200,
		body: {
			currentBp,
		},
	};
};
