import { addErrorToast } from '$lib/stores/toast';

import { ResponseError } from '$api/openapi';
import { parseApiError } from '$api/parse-api-error';

/**
 * Attempts to parse a `ResponseError` into a toast message.
 */
export const handleApiError = async (error: unknown) => {
	let message = undefined;

	console.error(error);

	if (error instanceof ResponseError) {
		const data = await parseApiError(error);

		message = data.message;

		console.error(data);
	}

	addErrorToast(message);
};
