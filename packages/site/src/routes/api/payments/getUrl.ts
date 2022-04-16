import { getMFUrl } from '$lib/services/myfatoorah';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get('id');
	console.log({ url }, 'getUrl.ts ~ 7');
	if (id) {
		const mfUrl = await getMFUrl({ trxId: id });
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
