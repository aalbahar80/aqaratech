import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

// eslint-disable-next-line @typescript-eslint/require-await
export const GET: RequestHandler = async () => {
	return json({
		status: 'OK',
	});
};
