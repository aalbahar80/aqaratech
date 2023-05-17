import {
	formatRequestLog,
	formatResponseLog,
	isHealthCheck,
} from '@self/utils';

import type { Handle } from '@sveltejs/kit';

import { logger } from '$lib/server/logger';

export const handleLog = (async ({ event, resolve }) => {
	const start = Date.now();

	if (!isHealthCheck(event.url.pathname)) {
		logger.http(
			formatRequestLog({
				request: event.request,
				url: event.url,
				extra: {
					user: event.locals.user?.email ?? null,
					userAgent: event.request.headers.get('user-agent'),
				},
			}),
		);
	}

	const response = await resolve(event);

	if (!isHealthCheck(event.url.pathname)) {
		logger.http(
			formatResponseLog({
				response,
				method: event.request.method,
				start,
				url: event.url,
				extra: {
					user: event.locals.user?.email ?? null,
				},
			}),
		);
	}

	return response;
}) satisfies Handle;
