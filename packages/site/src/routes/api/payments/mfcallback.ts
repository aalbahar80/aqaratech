import { getPaymentStatus, markAsPaid } from '$lib/services/myfatoorah';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ url }) => {
	try {
		const paymentId = url.searchParams.get('paymentId');

		if (!paymentId) {
			const error = new Error('Unable to get PaymentId from URL');
			throw error;
		}

		const { trxId, isPaid } = await getPaymentStatus(paymentId);
		if (isPaid) {
			await markAsPaid({ trxId, mfPaymentId: paymentId });
			return {
				status: 302,
				headers: {
					location: `/p/transactions/${trxId}?success=true`,
				},
			};
		} else {
			return {
				status: 302,
				headers: {
					location: `/p/transactions/${trxId}?success=false`,
				},
			};
		}
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
