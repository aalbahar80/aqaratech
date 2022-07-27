import { entityNameMap } from '$lib/constants/names';
import { getPaymentStatus, markAsPaid } from '$lib/services/myfatoorah';
import type { RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

export const GET: RequestHandler = async ({ url }) => {
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
				location: `/${entityNameMap.leaseInvoices.urlName}/${trxId}?success=${isPaid}`,
			},
		};
	} catch (error) {
		console.error(error);
		throw new Error('Failed to fetch payment status');

		// render empty page
		// return {
		// 	status: 404,
		// };

		// Redirect to home page
		// return {
		// 	status: 302,
		// 	headers: {
		// 		location: '/',
		// 	},
		// };
	}
};
