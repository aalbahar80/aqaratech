import { temporalClient } from '$lib/server/temporalClient';
import { trxNotificationWF } from '@self/temporal';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	const { id } = params;
	if (!id) {
		const error = new Error('Unable to get trx id from URL');
		throw error;
	}
	console.log('attempting to start trx notify workflow', id);

	try {
		await temporalClient.start(trxNotificationWF, {
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
