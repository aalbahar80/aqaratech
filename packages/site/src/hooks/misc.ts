import '@sentry/tracing';

import type { Handle } from '@sveltejs/kit';

import { environment } from '$aqenvironment';

// TODO: drop all js.map requests early?

export const handleMisc = (async ({ event, resolve }) => {
	// if (event.url.pathname.startsWith('/api/')) {
	// 	return fetch(event.request);

	if (environment.PUBLIC_AQARATECH_ENV !== 'production') {
		event.setHeaders({
			'X-Robots-Tag': 'noindex',
		});
	}

	return await resolve(event);
}) satisfies Handle;
