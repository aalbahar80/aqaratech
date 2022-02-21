export default {};
// import { getPaymentStatus, markAsPaid } from '$lib/services/myfatoorah';
// import type { RequestHandler } from '@sveltejs/kit';

// export const get: RequestHandler = async (req) => {
// 	const paymentId = req.url.searchParams.get('PaymentId');
// 	if (!paymentId) {
// 		const error = new Error('Unable to get PaymentId from URL');
// 		console.error(error);
// 		// TODO need to throw error? Only doing it to make sure it's logged in vercel
// 		throw error;
// 	}

// 	const { trxId, isPaid } = await getPaymentStatus(paymentId);
// 	if (isPaid) {
// 		await markAsPaid(trxId);
// 	}

// 	return {
// 		status: 302,
// 		headers: {
// 			// TODO implement receipt page
// 			location: `/p/transactions/${trxId}`,
// 		},
// 	};
// };
