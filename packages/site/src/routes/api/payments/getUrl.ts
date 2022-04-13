import type { RequestHandler } from '@sveltejs/kit';
import { getMFUrl } from '$lib/services/myfatoorah';

export const get: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get('id');
	if (id) {
		const mfUrl = await getMFUrl(id);
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
