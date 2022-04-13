export {};
// import type { RequestHandler } from '@sveltejs/kit';
// import { Connection, WorkflowClient } from '@temporalio/client';
// // import { getNextReminder } from '../../../../temporal/lib/workflows.js';
// import { getNextReminder } from '../../../../temporal/src/workflows';

// export const get: RequestHandler = async ({ params }) => {
// 	const { id } = params;
// 	if (!id) {
// 		const error = new Error('Unable to get trxId from URL');
// 		throw error;
// 	}
// 	console.log('getting next reminder for transaction: ', id);

// 	const connection = new Connection({
// 		address: 'temporal.letand.be',
// 	});
// 	const client = new WorkflowClient(connection.service);
// 	const handle = client.getHandle(id);

// 	try {
// 		const reminder = await handle.query(getNextReminder);
// 		console.log(`The next reminder is at: ${reminder}`);
// 		return {
// 			status: 200,
// 			body: { reminder },
// 		};
// 	} catch (err) {
// 		console.error('Error getting next reminder', err);

// 		return {
// 			status: 500,
// 			body: {
// 				error:
// 					err instanceof Error ? err.message : 'Unable to get next reminder',
// 			},
// 		};
// 	}
// };
