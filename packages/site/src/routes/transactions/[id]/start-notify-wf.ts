import type { RequestHandler } from '@sveltejs/kit';
import { Connection, WorkflowClient } from '@temporalio/client';
// import { trxNotificationWF } from '../../../../temporal/lib/workflows.js';
import { trxNotificationWF } from '../../../../temporal/src/workflows';

export const get: RequestHandler = async ({ params }) => {
	const { id } = params;
	if (!id) {
		const error = new Error('Unable to get trx id from URL');
		throw error;
	}
	console.log('attempting to start trx notify workflow', id);

	const connection = new Connection({
		address: 'temporal.letand.be',
	});
	const client = new WorkflowClient(connection.service);

	try {
		await client.start(trxNotificationWF, {
			workflowId: id,
			taskQueue: 'hello-world',
			args: [id],
		});
	} catch (e) {
		console.log('error starting trxNotificationWF');
		console.error(e);
	}

	return {
		status: 200,
		body: { message: 'trxWF started' },
	};
};
