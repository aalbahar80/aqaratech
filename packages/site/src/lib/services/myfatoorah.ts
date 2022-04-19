import { environment } from '$environment';
import trpc from '$lib/client/trpc';

const { myfatoorahConfig, callbackDomain } = environment;
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

// TODO setup proper auth later as per:
// https://auth0.com/docs/get-started/authentication-and-authorization-flow/client-credentials-flow

/**
 * Fetches a payment URL from myfatoorah for a given transaction.
 * This is used to redirect the user for payment.
 */
export const getMFUrl = async ({
	trxId,
}: {
	trxId: string;
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

	const callbackUrl = `${callbackDomain}/api/payments/mfcallback`;
	let trxData = {
		InvoiceValue: trx.amount,
		CustomerReference: trx.id,
		CustomerName: name,
		CustomerEmail: tenant.email,
		CustomerMobile: tenant.phone,
		CallBackUrl: callbackUrl,
	};

	if (process.env.VERCEL_ENV !== 'production') {
		console.debug('using email/phone from env variables');
		trxData = {
			...trxData,
			CustomerEmail: myfatoorahConfig.MYFATOORAH_EMAIL,
			CustomerMobile: myfatoorahConfig.MYFATOORAH_PHONE,
		};
	}
	console.log({ trxData }, 'myfatoorah.ts ~ 70');

	try {
		const res = await fetch(
			`${myfatoorahConfig.MYFATOORAH_BASE_URL}/v2/ExecutePayment`,
			{
				headers: {
					Authorization: `Bearer ${myfatoorahConfig.MYFATOORAH_TOKEN}`,
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({
					PaymentMethodId: 1, // KNET
					// PaymentMethodId: 20, // VISA
					// PaymentMethodId: 9, // VISA2
					...trxData,
				}),
			},
		);

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
	const res = await fetch(
		`${myfatoorahConfig.MYFATOORAH_BASE_URL}/v2/GetPaymentStatus`,
		{
			headers: {
				Authorization: `Bearer ${myfatoorahConfig.MYFATOORAH_TOKEN}`,
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({
				PaymentId: paymentId,
				KeyType: 'PaymentId',
			}),
		},
	);

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
		return result;
	} catch (err) {
		console.error(err);
		throw err;
	}
};
