import { dev } from '$app/env';
import trpc from '$lib/client/trpc';

interface MFResponse {
	Data: {
		PaymentURL: string;
	};
}

interface MyFatoorahPaymentStatusResponse {
	Data: {
		InvoiceId: number;
		CustomerReference: string;
		InvoiceStatus: string;
	};
}

const mfBaseUrl = import.meta.env.VITE_MYFATOORAH_BASE_URL;
const mfToken = import.meta.env.VITE_MYFATOORAH_TOKEN;

// TODO setup proper auth later as per:
// https://auth0.com/docs/get-started/authentication-and-authorization-flow/client-credentials-flow

/**
 * Fetches a payment URL from myfatoorah for a given transaction.
 * This is used to redirect the user for payment.
 */
export const getMFUrl = async ({
	trxId,
	callbackUrl,
}: {
	trxId: string;
	callbackUrl: string;
}): Promise<string> => {
	// get necessary info for payment

	console.log('fetching mf url');
	const trx = await trpc.query('public:transactions:pay', trxId);

	const { tenant } = trx.lease;
	const name = [
		tenant.firstName,
		tenant.secondName,
		tenant.thirdName,
		tenant.lastName,
	]
		.filter(Boolean)
		.join(' ');

	// const callbackUrl = `${get(page).url.origin}/api/payments/mfcallback`;

	let trxData = {
		InvoiceValue: trx.amount,
		CustomerReference: trx.id,
		CustomerName: name,
		CustomerEmail: tenant.email,
		CustomerMobile: tenant.phone,
		CallBackUrl: callbackUrl,
	};

	if (dev) {
		trxData = {
			InvoiceValue: trx.amount,
			CustomerReference: trx.id,
			CustomerName: name,
			CustomerEmail: 'dev.tester.4@mailthink.net',
			CustomerMobile: import.meta.env.VITE_MOBILE,
			CallBackUrl: 'https://eojx7rde2hgw22a.m.pipedream.net',
		};
	}
	console.log({ trxData }, 'myfatoorah.ts ~ 70');

	try {
		const res = await fetch(`${mfBaseUrl}/v2/ExecutePayment`, {
			headers: {
				Authorization: `Bearer ${mfToken}`,
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({
				PaymentMethodId: 1, // KNET
				// PaymentMethodId: 20, // VISA
				// PaymentMethodId: 9, // VISA2
				...trxData,
			}),
		});

		const data = (await res.json()) as MFResponse;
		console.log(data, 'myfatoorah.ts ~ 85');
		return data.Data.PaymentURL;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

/**
 * Fetches detailed payment status from myfatoorah.
 */
export const getPaymentStatus = async (
	paymentId: string,
): Promise<{ trxId: string; isPaid: boolean }> => {
	// get payment status from myfatoorah
	const res = await fetch(`${mfBaseUrl}/v2/GetPaymentStatus`, {
		headers: {
			Authorization: `Bearer ${mfToken}`,
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify({
			PaymentId: paymentId,
			KeyType: 'PaymentId',
		}),
	});

	const data = (await res.json()) as MyFatoorahPaymentStatusResponse;

	const isPaid = data.Data.InvoiceStatus === 'Paid';
	const trxId = data.Data.CustomerReference;

	return {
		trxId,
		isPaid,
	};
};

/**
 * Mark transaction as paid. Fires off a mutation to update transaction.
 */
export const markAsPaid = async ({
	trxId,
	mfPaymentId,
}: {
	trxId: string;
	mfPaymentId: string;
}) => {
	// TODO how to get correct invoice URL?
	// const invoiceUrl =
	// 	'https://demo.myfatoorah.com/En/KWT/PayInvoice/Details/01072121063737';
	// const mfInvoiceUrl =
	// 	'https://demo.myfatoorah.com/En/KWT/PayInvoice/Result?paymentId=100202210635345720';

	try {
		// TODO auth here (machine to machine)?
		const result = await trpc.mutation('transactions:updatePaid', {
			id: trxId,
			isPaid: true,
			mfPaymentId,
		});
		return result.receiptUrl;
	} catch (err) {
		console.error(err);
		throw err;
	}
};
