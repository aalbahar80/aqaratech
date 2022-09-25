import { ResponseError } from '$api/openapi';
import * as Sentry from '@sentry/svelte';
import type { HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = ({ error }) => {
	console.log({ error });

	Sentry.captureException(error);

	if (error instanceof ResponseError) {
		return {
			message: error.response.statusText || 'An error occurred',
			status: error.response.status,
		};
	}

	return;
};
