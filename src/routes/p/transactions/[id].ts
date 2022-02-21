export default {};
// import { dev } from '$app/env';
// import { f } from '$lib/config/colorLog';
// import { logger } from '$lib/config/logger';
// import { getMFUrl } from '$lib/services/myfatoorah';
// import type { RequestHandler } from '@sveltejs/kit';

// export const get: RequestHandler = async ({ params }) => {
// 	const { id } = params;

// 	// check if transaction exists
// 	const client = createClient({
// 		url: 'https://hasura-xf70.onrender.com/v1/graphql',
// 	});

// 	const result = await client.query(TrxPublicInfoDocument, { id }).toPromise();
// 	const trx = result.data?.transactions_by_pk;
// 	logger.debug(f('[id].ts', 23, { trx }));

// 	if (!trx) {
// 		return {
// 			status: 404,
// 			body: 'Transaction not found',
// 		};
// 	}

// 	const { is_paid: isPaid, receipt_url: receiptUrl } = trx ?? {};

// 	if (isPaid && receiptUrl) {
// 		// TODO replace with mf url
// 		const dummyUrl = `https://dummyimage.com/600x400/000/fff&text=${trx.id}`;
// 		const url = dev ? dummyUrl : receiptUrl;
// 		logger.debug(f('[id].ts', 36, { url }));

// 		return {
// 			status: 302,
// 			headers: {
// 				location: url,
// 			},
// 		};
// 	}
// 	if (isPaid && !receiptUrl) {
// 		logger.warn(
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
// 			logger.error('Unable to generate payment url', err, { err });
// 			return {
// 				status: 500,
// 				body: 'Failed to get payment url',
// 			};
// 		}
// 	}

// 	logger.warn('Unhandled case', { trx });
// 	return {
// 		status: 500,
// 		body: 'Unknown error',
// 	};
// };
