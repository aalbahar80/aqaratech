import { ResponseError } from '$api/openapi';
import * as Sentry from '@sentry/svelte';
import type { HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = ({ error, event }) => {
	console.log({ error });

	if (error instanceof ResponseError) {
		Sentry.captureEvent(
			{
				level: 'error',
				message: error.message,
				tags: {
					status: error.response.status,
					routeId: event.routeId,
					pathname: event.url.pathname,
				},
				request: {
					url: event.url.href,
					query_string: event.url.search,
				},
			},
			{
				originalException: error,
			},
		);

		return {
			message: error.response.statusText || 'An error occurred',
			status: error.response.status,
		};
	} else {
		Sentry.captureException(error, {
			tags: {
				routeId: event.routeId,
				pathname: event.url.pathname,
			},
			extra: {
				href: event.url.href,
				params: event.params,
				query_string: event.url.search,
			},
			requestSession: {
				status: 'errored',
			},
		});

		return;
	}
};
