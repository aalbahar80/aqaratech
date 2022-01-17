// eslint-disable-next-line import/no-extraneous-dependencies
import { createClient, gql } from '@urql/core';
import { getMFUrl } from '$lib/services/myfatoorah';
import type { RequestHandler } from '@sveltejs/kit';
import type { TrxPublicInfo, TrxPublicInfoVariables } from './[id].json.gql';

export const get: RequestHandler = async ({ params }) => {
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

	const { is_paid: isPaid, receipt_url: receiptUrl } = trx ?? {};

	let url: string;

	if (isPaid && receiptUrl) {
		// redirect to existing receipt url
		url = receiptUrl;
	} else if (isPaid && !receiptUrl) {
		// display message that the transaction is paid
		url = 'generic-ispaid';
	} else {
		// redirect to new payment url
		url = await getMFUrl(1);
	}

	return {
		status: 302,
		headers: {
			location: url,
		},
	};
};
