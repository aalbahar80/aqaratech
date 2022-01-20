import { dev } from '$app/env';
import { logger } from '$lib/config/logger';
import { getMFUrl } from '$lib/services/myfatoorah';
import type { RequestHandler } from '@sveltejs/kit';
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
		const dummyUrl = `https://dummyimage.com/600x400/000/fff&text=${trx.id}`;
		const url = dev ? dummyUrl : receiptUrl;
		logger.info(`Redirecting to receipt url: ${url}`);
		return {
			status: 302,
			headers: {
				location: url,
			},
		};
	}
	if (isPaid && !receiptUrl) {
		logger.warn(
			`Transaction is paid but no receipt url is available.
			This should mean that the payment was manually marked as paid.`,
		);
		// TODO create better generic transaction page
		return {
			status: 200,
			body: 'This transaction has been paid.',
		};
	}
	if (!isPaid) {
		try {
			const url = await getMFUrl(id);
			return {
				status: 302,
				headers: {
					location: url,
				},
			};
		} catch (err) {
			logger.error('Unable to generate payment url', err, { err });
			return {
				status: 500,
				body: 'Failed to get payment url',
			};
		}
	}
	logger.warn('Unhandled case', { trx });
	return {
		status: 500,
		body: 'Unknown error',
	};
};
