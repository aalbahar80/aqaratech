import { environment } from '$environment';
import prismaClient from '$lib/server/prismaClient';
import { z } from 'zod';

const { myfatoorahConfig } = environment;

interface MyFatoorahPaymentStatusResponse {
	Data: {
		InvoiceId: number;
		CustomerReference: string;
		InvoiceStatus: string;
	};
}

// TODO: setup proper auth later as per:
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
	const trx = await prismaClient.transaction.findUnique({
		where: { id: trxId },
		select: {
			id: true,
			amount: true,
			lease: {
				select: {
					tenant: {
						select: {
							firstName: true,
							secondName: true,
							thirdName: true,
							lastName: true,
							email: true,
							phone: true,
						},
					},
				},
			},
		},
	});

	if (!trx) {
		throw new Error('Transaction not found');
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

	const callbackUrl = `${myfatoorahConfig.MYFATOORAH_CALLBACK_URL}/api/payments/mfcallback`;
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

		const MFResponse = z.object({
			Data: z.object({
				PaymentURL: z.string().url(),
			}),
		});
		const raw = await res.json();
		const data = MFResponse.parse(raw);
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
				Key: paymentId,
				KeyType: 'PaymentId',
			}),
		},
	);

	// TODO: use zod to parse response. Good to catch any errors early.
	const data = (await res.json()) as MyFatoorahPaymentStatusResponse;
	console.log({ data }, 'myfatoorah.ts ~ 116');

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
		console.log(`attempting to mark trx ${trxId} as paid`);
		// TODO auth here (machine to machine)?
		const result = await prismaClient.transaction.update({
			where: { id: trxId },
			data: {
				mfPaymentId,
				isPaid: true,
				paidAt: new Date(),
			},
		});
		console.log({ result }, 'myfatoorah.ts ~ 159');
	} catch (err) {
		console.error(err);
		return;
	}
};
