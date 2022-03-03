export {};
// import { dev } from '$app/env';
// import trpc from '$lib/client/trpc';
// import { getMFUrl } from '$lib/services/myfatoorah';
// import type { RequestHandler } from '@sveltejs/kit';

// export const get: RequestHandler = async ({ params }) => {
// 	const { id } = params;

// 	// check if transaction exists
// 	const trx = await trpc.query('transactions:read', id);

// 	if (!trx) {
// 		return {
// 			status: 404,
// 			body: 'Transaction not found',
// 		};
// 	}
// 	return {
// 		status: 200,
// 		body: {
// 			trx,
// 		},
// 	};

// 	const { isPaid, receiptUrl } = trx ?? {};

// 	if (isPaid && receiptUrl) {
// 		// TODO replace with mf url
// 		const dummyUrl = `https://dummyimage.com/600x400/000/fff&text=${trx.id}`;
// 		const url = dev ? dummyUrl : receiptUrl;

// 		return {
// 			status: 302,
// 			headers: {
// 				location: url,
// 			},
// 		};
// 	}
// 	if (isPaid && !receiptUrl) {
// 		console.warn(
// 			`Transaction is paid but no receipt url is available.
// 			This should mean that the payment was manually marked as paid.`,
// 		);

// 		// TODO create better generic transaction page
// 		return {
// 			status: 200,
// 			body: 'This transaction has been paid.',
// 		};
// 	}

// 	if (!isPaid) {
// 		try {
// 			const url = await getMFUrl(id);
// 			return {
// 				status: 302,
// 				headers: {
// 					location: url,
// 				},
// 			};
// 		} catch (err) {
// 			console.error('Unable to generate payment url', err, { err });
// 			return {
// 				status: 500,
// 				body: 'Failed to get payment url',
// 			};
// 		}
// 	}

// 	console.warn('Unhandled case', { trx });
// 	return {
// 		status: 500,
// 		body: 'Unknown error',
// 	};
// };
