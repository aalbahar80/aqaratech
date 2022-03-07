import type { RequestHandler } from '@sveltejs/kit';
import { Connection, WorkflowClient } from '@temporalio/client';
import { getCustomer, getBp } from '../../../temporal/src/workflows';
// import { getCustomer, getBp } from '../../../temporal/lib/workflows';

export const get: RequestHandler = async () => {
	console.log('getting customer...');
	const connection = new Connection({
		address: 'temporal.letand.be',
	});
	const client = new WorkflowClient(connection.service);
	const handle = client.getHandle('business-meaningful-id');
    console.log(handle.workflowId)
	const currentBp = await handle.query(getBp);
	const customer = await handle.query(getCustomer);
	console.log(`The current billing period is ${currentBp}`);
	console.log(customer);

	return {
		status: 200,
		body: {
			currentBp,
			customer,
		},
		// body: { workflowId: handle.workflowId},
	};
};
