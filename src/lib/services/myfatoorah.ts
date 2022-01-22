import { dev } from '$app/env';
import { page } from '$app/stores';
import { f } from '$lib/config/colorLog';
import { logger } from '$lib/config/logger';
import { createClient, gql } from '@urql/core';
import flush from 'just-flush';
import { get } from 'svelte/store';
import { MarkPaidDocument, PaymentRelatedInfoDocument } from './myfatoorah.gql';

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
const client = createClient({
	url: 'https://hasura-xf70.onrender.com/v1/graphql',
	fetchOptions: {
		headers: {
			'x-hasura-admin-secret': 'myadminsecret',
		},
	},
});

/**
 * Fetches a payment URL from myfatoorah for a given transaction.
 * This is used to redirect the user for payment.
 */
export const getMFUrl = async (id: string): Promise<string> => {
	// get necessary info for payment

	const paymentQuery = gql`
		query PaymentRelatedInfo($id: uuid!) {
			transactions_by_pk(id: $id) {
				id
				amount
				receipt_url
				memo
				lease_id
				is_paid
				created_at
				lease {
					tenant {
						first_name
						second_name
						last_name
						third_name
						email
						phone
						user {
							email
							phone
						}
					}
				}
			}
		}
	`;

	const result = await client
		.query(PaymentRelatedInfoDocument, { id })
		.toPromise();
	logger.debug(f('myfatoorah.ts', 75, { result }));

	const trx = result.data?.transactions_by_pk;
	const tenant = trx?.lease?.tenant;
	if (!trx || !tenant || !trx.amount) {
		logger.warn('📜 myfatoorah.ts 79 trx:', trx);
		logger.warn('📜 myfatoorah.ts 80 tenant:', tenant);
		logger.warn('📜 myfatoorah.ts 81 trx?.amount:', trx?.amount);
		const err = new Error('Transaction or Tenant not found');
		logger.error(err);
		throw err;
	}

	const name = [
		tenant.first_name,
		tenant.second_name,
		tenant.third_name,
		tenant.last_name,
	]
		.filter(Boolean)
		.join(' ');

	const callbackUrl = `${get(page).url.origin}/api/payments/mfcallback}`;
	logger.debug(f('myfatoorah.ts', 100, { callbackUrl }));

	const trxData = {
		InvoiceValue: trx.amount,
		CustomerReference: trx.id,
		CustomerName: name,
		// CustomerEmail: 'dev.tester.2@mailthink.net',
		CustomerEmail: tenant.email,
		// TODO delete my phone number
		CustomerMobile: dev ? import.meta.env.VITE_MOBILE : tenant.phone?.slice(-8),
		// CallBackUrl: 'https://43fc3279ac34a4457087c512ee54f248.m.pipedream.net',
		CallBackUrl: callbackUrl,
	};

	try {
		const res = await fetch(`${mfBaseUrl}/v2/ExecutePayment`, {
			headers: {
				Authorization: `Bearer ${mfToken}`,
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({
				PaymentMethodId: 1, // KNET
				...flush(trxData),
			}),
		});
		logger.debug(f('myfatoorah.ts', 127, { res }));

		const data = (await res.json()) as MFResponse;
		logger.debug(f('myfatoorah.ts', 130, { data }));

		return data.Data.PaymentURL;
	} catch (err) {
		logger.error(err);
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

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const mutation = gql`
		mutation MarkPaid($id: uuid!, $is_paid: Boolean, $receipt_url: String) {
			update_transactions_by_pk(
				pk_columns: { id: $id }
				_set: { is_paid: $is_paid, receipt_url: $receipt_url }
			) {
				id
				is_paid
				lease_id
				memo
				receipt_url
				amount
			}
		}
	`;

	const result = await client
		.mutation(MarkPaidDocument, {
			id: trxId,
			receipt_url: invoiceUrl,
		})
		.toPromise();

	if (result.error) {
		console.error(result.error);
	}

	return result.data?.update_transactions_by_pk?.receipt_url;
};
