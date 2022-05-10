import { getMFUrl } from '$lib/services/myfatoorah';
import type { RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

export const get: RequestHandler = async ({ url }) => {
	const ID = z.string().uuid();
	const raw = url.searchParams.get('id');
	try {
		const id = ID.parse(raw);
		const mfUrl = await getMFUrl({ trxId: id });
		return {
			status: 200,
			body: {
				mfUrl,
			},
		};
	} catch (err) {
		console.error(err);
		return {
			status: 404,
			body: 'Unable to get url from myfatoorah',
		};
	}
};
