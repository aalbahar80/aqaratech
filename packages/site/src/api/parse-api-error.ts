import { z } from 'zod';

import type { ResponseError } from '$api/openapi';

export const parseApiError = async (error: ResponseError) => {
	const res: unknown = await error.response.json();

	const parsed = errorSchema.safeParse(res);

	let message = '';

	if (parsed.success) {
		message = parsed.data.message;
	} else {
		message = 'An unknown error occurred';
	}

	return {
		status: error.response.status,
		message,
	};
};

const errorSchema = z.object({
	// statusCode: z.number(),
	message: z.string(),
});
