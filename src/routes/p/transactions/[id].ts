import { getMFUrl } from '$lib/services/myfatoorah';
import type { RequestHandler } from '@sveltejs/kit';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createClient, gql } from '@urql/core';
import { TrxPublicInfoDocument } from './[id].gql';

export const get: RequestHandler<Locals> = async ({ params }) => {
	const { id } = params;

	// check if the transaction exists
	const client = createClient({
		url: 'https://hasura-xf70.onrender.com/v1/graphql',
	});

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const trxQuery = gql`
		query TrxPublicInfo($_eq: Int) {
			transactions(where: { id: { _eq: $_eq } }) {
				id
				is_paid
				receipt_url
			}
		}
	`;

	const result = await client
		.query(TrxPublicInfoDocument, { _eq: +id })
		.toPromise();
	const trx = result.data?.transactions[0];
	console.log(trx);

	if (!trx) {
		return {
			status: 404,
			body: 'Transaction not found',
		};
	}

	const { is_paid: isPaid, receipt_url: receiptUrl } = trx ?? {};

	if (isPaid && receiptUrl) {
		return {
			status: 302,
			headers: {
				location: receiptUrl,
			},
		};
	}
	if (isPaid && !receiptUrl) {
		console.warn(
			`Transaction is paid but no receipt url is available.
			This should mean that the payment was manually marked as paid.`,
		);
		return {
			status: 200,
			body: 'This transaction has been paid.',
		};
	}
	if (!isPaid) {
		const newUrl = await getMFUrl(id);
		if (newUrl) {
			return {
				status: 302,
				headers: {
					location: newUrl,
				},
			};
		}
		console.error('Unable to generate payment url', { newUrl });
		return {
			status: 500,
			body: 'Failed to get payment url',
		};
	}
	console.error(
		'🚀 ~ file: [id].ts ~ line 69 ~ constget:RequestHandler<Locals>= ~ trx',
		trx,
	);
	return {
		status: 500,
		body: 'Unknown error',
	};
};
