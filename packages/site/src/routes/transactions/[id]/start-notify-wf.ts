import { trxNotificationWF } from '@self/temporal';
import type { RequestHandler } from '@sveltejs/kit';
import { Connection, WorkflowClient } from '@temporalio/client';

export const get: RequestHandler = async ({ params }) => {
	const { id } = params;
	if (!id) {
		const error = new Error('Unable to get trx id from URL');
		throw error;
	}
	console.log('attempting to start trx notify workflow', id);

	const connection = new Connection({
		// address: dev ? 'localhost' : 'temporal.letand.be',
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
