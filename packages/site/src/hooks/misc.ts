import { isLiveEnv } from '@self/utils';

import type { Handle } from '@sveltejs/kit';

import { environment } from '$aqenvironment';

export const handleMisc = (async ({ event, resolve }) => {
	// if (event.url.pathname.startsWith('/api/')) {
	// 	return fetch(event.request);

	// drop all requests to source maps
	if (
		event.url.pathname.endsWith('js.map') &&
		isLiveEnv(environment.PUBLIC_AQARATECH_ENV)
	) {
		return new Response(null, {
			status: 404,
		});
	}

	if (environment.PUBLIC_AQARATECH_ENV !== 'production') {
		event.setHeaders({
			'X-Robots-Tag': 'noindex',
		});
	}

	return await resolve(event);
}) satisfies Handle;
