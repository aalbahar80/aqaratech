import { temporalClient } from '$lib/server/temporalClient';
import { getNextReminder } from '@self/temporal';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	const { id } = params;
	if (!id) {
		const error = new Error('Unable to get trxId from URL');
		throw error;
	}
	console.log('getting next reminder for transaction: ', id);

	const handle = temporalClient.getHandle(id);

	try {
		const reminder = await handle.query(getNextReminder);
		console.log(`The next reminder is at: ${reminder}`);
		return {
			status: 200,
			body: { reminder },
		};
	} catch (err) {
		console.error('Error getting next reminder', err);

		return {
			status: 500,
			body: {
				error:
					err instanceof Error ? err.message : 'Unable to get next reminder',
			},
		};
	}
};
