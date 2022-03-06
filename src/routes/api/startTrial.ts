import type { RequestHandler } from '@sveltejs/kit';
import { Connection, WorkflowClient } from '@temporalio/client';
// import { SubscriptionWorkflow } from '../../../temporal/src/workflows';
import { SubscriptionWorkflow } from '../../../temporal/lib/workflows.js';

export const get: RequestHandler = async () => {
	// if (!true) {
	// 	return {
	// 		status: 200,
	// 		body: {
	// 			abc: 'def',
	// 		},
	// 	};
	// }

	// const connection = new Connection({});
	// const client = new WorkflowClient(connection.service);

    const client = new WorkflowClient();

	const customer = {
		id: 'abcdef',
		email: 'masvidal@ufc.com',
		maxBillingPeriods: 6,
		trialPeriod: 3000,
		billingPeriod: 3000,
		initialBillingPeriodCharge: 200,
		billingPeriodCharge: 399,
	};
	// console.log('getting');
	const handle = await client.start(SubscriptionWorkflow, {
		workflowId: 'business-meaningful-id',
		taskQueue: 'hello-world', // must match the taskQueue polled by Worker above
		args: [customer],
		// workflowId: // TODO: use business-meaningful user/transaction ID here
	}); // kick off the purchase async
	//
	return {
		status: 200,
		body: { workflowId: handle.workflowId},
	};
};
