import { Connection, WorkflowClient } from '@temporalio/client';

const connection = new Connection({
	address: 'temporal.letand.be',
});
export const temporalClient = new WorkflowClient(connection.service);
