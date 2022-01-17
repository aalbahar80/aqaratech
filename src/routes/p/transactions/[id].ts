// eslint-disable-next-line import/no-extraneous-dependencies
import { createClient, gql } from '@urql/core';
import { getMFUrl } from '$lib/services/myfatoorah';
import type { RequestHandler } from '@sveltejs/kit';
import type { TrxPublicInfo, TrxPublicInfoVariables } from './[id].gql';

export const get: RequestHandler<Locals> = async ({ params }) => {
	const { id } = params;

	// check if the transaction exists
	const client = createClient({
		url: 'https://hasura-xf70.onrender.com/v1/graphql',
	});

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
		.query<TrxPublicInfo, TrxPublicInfoVariables>(trxQuery, { _eq: +id })
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

	let url: string;

	if (isPaid && receiptUrl) {
		// redirect to existing receipt url
		url = receiptUrl;
	} else if (isPaid && !receiptUrl) {
		return {
			status: 200,
			body: 'This transaction has been paid.',
		};
	} else if (!isPaid) {
		// redirect to new payment url
		url = await getMFUrl(id);
	} else {
		console.error('unhandled case');
		throw new Error('unhandled case');
	}

	return {
		status: 302,
		headers: {
			location: url,
		},
	};
};
