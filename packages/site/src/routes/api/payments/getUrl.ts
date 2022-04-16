import { getMFUrl } from '$lib/services/myfatoorah';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get('id');
	console.log({ url }, 'getUrl.ts ~ 7');
	const callbackUrl = `${url.origin}/api/payments/mfcallback`;
	if (id) {
		const mfUrl = await getMFUrl({ trxId: id, callbackUrl });
		return {
			status: 200,
			body: {
				mfUrl,
			},
		};
	}
	return {
		status: 404,
		body: 'No id provided',
	};
};
