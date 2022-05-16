import { eligibleTrxs } from '$lib/server/cron/blast-sms';
import type { RequestHandler } from '@sveltejs/kit';

/**
 * Grabs eligible transactions and sends them a sms.
 */
export const post: RequestHandler = async ({ url }) => {
	try {
		const trxs = await eligibleTrxs();
		const urls = trxs.map((trx) => `${url.origin}/transactions/${trx}/notify`);
		const datas = await Promise.all(
			urls.map(async (url) => {
				const resp = await fetch(url, { method: 'POST' });
				return resp.json();
			}),
		);
		console.log(datas, 'notify-all.ts ~ 22');
		return {
			status: 200,
			body: {
				success: true,
			},
		};
	} catch (e) {
		console.error(e);
		return {
			status: 500,
		};
	}
};
