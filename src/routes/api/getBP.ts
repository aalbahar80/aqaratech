import type { RequestHandler } from '@sveltejs/kit';
import { Connection, WorkflowClient } from '@temporalio/client';
import { getBillingPeriod } from '../../../temporal/lib/workflows.js';

export const get: RequestHandler = async ({ url }) => {
	const leaseId = url.searchParams.get('leaseId');
    if (!leaseId) {
        const error = new Error('Unable to get leaseId from URL');
        throw error;
    }
	console.log('getting current billing period for lease: ', leaseId);

	const connection = new Connection({
		address: 'temporal.letand.be',
	});
	const client = new WorkflowClient(connection.service);
	const handle = client.getHandle(leaseId);

	const currentBp = await handle.query(getBillingPeriod);
	console.log(`The current billing period is ${currentBp}`);

	return {
		status: 200,
		body: {
			currentBp,
		},
	};
};
