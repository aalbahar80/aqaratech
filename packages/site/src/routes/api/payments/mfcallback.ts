import { getPaymentStatus, markAsPaid } from '$lib/services/myfatoorah';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (req) => {
	try {
		const paymentId = req.url.searchParams.get('PaymentId');

		if (!paymentId) {
			const error = new Error('Unable to get PaymentId from URL');
			console.error(error);
			throw error;
		}

		const { trxId, isPaid } = await getPaymentStatus(paymentId);
		if (isPaid) {
			await markAsPaid({ trxId, mfPaymentId: paymentId });
		}
		return {
			status: 302,
			headers: {
				// TODO implement receipt page
				location: `/p/transactions/${trxId}`,
			},
		};
	} catch (error) {
		console.error(error);
		return {
			status: 302,
			headers: {
				location: '/',
			},
		};
	}
};
