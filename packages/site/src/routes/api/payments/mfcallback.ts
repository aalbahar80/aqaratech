import { getPaymentStatus, markAsPaid } from '$lib/services/myfatoorah';
import type { RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

export const get: RequestHandler = async ({ url }) => {
	try {
		const rawPaymentId = url.searchParams.get('paymentId');
		const paymentId = z.string().parse(rawPaymentId);

		const { trxId, isPaid } = await getPaymentStatus(paymentId);
		if (isPaid) {
			await markAsPaid({ trxId, mfPaymentId: paymentId });
		}
		return {
			status: 302,
			headers: {
				location: `/p/transactions/${trxId}?success=${isPaid}`,
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
