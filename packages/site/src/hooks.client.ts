import * as SentrySvelte from '@sentry/svelte';
// @ts-expect-error importing @sentry/tracing for side effects
// eslint-disable-next-line import/order, @typescript-eslint/no-unused-vars
import { BrowserTracing } from '@sentry/tracing';

import type { HandleClientError } from '@sveltejs/kit';

import { ResponseError } from '$api/openapi';

SentrySvelte.setTag('svelteKit', 'browser');

export const handleError = (({ error, event }) => {
	console.log({ error });

	if (error instanceof ResponseError) {
		SentrySvelte.captureEvent(
			{
				level: 'error',
				message: error.message,
				tags: {
					status: error.response.status,
					routeId: event.route.id,
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
		SentrySvelte.captureException(error, {
			contexts: {
				svelteKit: { event },
			},
			// TODO: Consider removing properties below if contexts.svelteKit.event is enough
			tags: {
				routeId: event.route.id,
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
}) satisfies HandleClientError;
