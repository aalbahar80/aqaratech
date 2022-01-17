import { dev } from '$app/env';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createClient, gql } from '@urql/core';
import flush from 'just-flush';
import { PaymentRelatedInfoDocument } from './myfatoorah.gql';

interface MFResponse {
	Data: {
		PaymentURL: string;
	};
}

export const getMFUrl = async (id: string) => {
	// get necessary info for payment

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

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const paymentQuery = gql`
		query PaymentRelatedInfo($id: Int!) {
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
		.query(PaymentRelatedInfoDocument, { id: +id })
		.toPromise();
	console.log('🚀 ~ file: myfatoorah.ts ~ line 58 ~ getMFUrl ~ result', result);

	const trx = result.data?.transactions_by_pk;
	const tenant = trx?.lease?.tenant;
	if (!trx || !tenant || !trx.amount) {
		return null;
	}
	const name = [
		tenant.first_name,
		tenant.second_name,
		tenant.third_name,
		tenant.last_name,
	]
		.filter(Boolean)
		.join(' ');

	const trxData = {
		InvoiceValue: trx.amount,
		CustomerReference: trx.id,
		CustomerName: name,
		CustomerEmail: tenant.email,
		CustomerMobile: dev ? import.meta.env.VITE_MOBILE : tenant.phone?.slice(-8),
		// CustomerEmail: 'dev.tester.2@mailthink.net',
		// TODO delete my phone number
	};

	const mfBaseUrl = import.meta.env.VITE_MYFATOORAH_BASE_URL;
	const mfToken = import.meta.env.VITE_MYFATOORAH_TOKEN;

	try {
		const res = await fetch(`${mfBaseUrl}/v2/ExecutePayment`, {
			headers: {
				Authorization: `Bearer ${mfToken}`,
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({
				PaymentMethodId: 1, // KNET
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				...flush(trxData),
			}),
		});
		console.log('🚀 ~ file: myfatoorah.ts ~ line 96 ~ getMFUrl ~ res', res);
		const data = (await res.json()) as MFResponse;
		console.log('🚀 ~ file: myfatoorah.ts ~ line 98 ~ getMFUrl ~ data', data);
		return data.Data.PaymentURL;
	} catch (err) {
		console.error(err);
		throw err;
	}
};
