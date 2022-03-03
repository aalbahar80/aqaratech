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
export const getMFUrl = async (id: string): Promise<string> => {
	// get necessary info for payment

	console.log('fetching mf url');
	const trx = await trpc.query('transactions:pay', id);
	if (!trx) {
		const err = new Error('Transaction or Tenant not found');
		console.error(err);
		throw err;
	}

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

	const trxDataRaw = {
		InvoiceValue: trx.amount,
		CustomerReference: trx.id,
		CustomerName: name,
		// CustomerEmail: 'dev.tester.2@mailthink.net',
		CustomerEmail: tenant.email,
		// TODO delete my phone number
		CustomerMobile: dev ? import.meta.env.VITE_MOBILE : tenant.phone.slice(-8),
		CallBackUrl: 'https://eojx7rde2hgw22a.m.pipedream.net',
		// CallBackUrl: 'https://43fc3279ac34a4457087c512ee54f248.m.pipedream.net',
		// CallBackUrl: callbackUrl,
	};
	// remove null and undefined values from trxData
	const trxData = Object.fromEntries(
		Object.entries(trxDataRaw).filter(([key, value]) => value !== null),
	);
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
				...trxData,
			}),
		});

		const data = (await res.json()) as MFResponse;
		console.log({ data }, 'myfatoorah.ts ~ 85');
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
 * Mark transaction as paid. Fires off a mutation to Hasura to update transaction.
 */
export const markAsPaid = async (trxId: string) => {
	// TODO how to get correct invoice URL?
	const invoiceUrl =
		'https://demo.myfatoorah.com/En/KWT/PayInvoice/Details/01072121063737';

	try {
		const result = await trpc.mutation('transactions:markPaid', {
			id: trxId,
			receiptUrl: invoiceUrl,
			isPaid: true,
		});
		return result.receiptUrl;
	} catch (err) {
		console.error(err);
		throw err;
	}
};
