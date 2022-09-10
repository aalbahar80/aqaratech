import { environment } from '$aqenvironment';
import { PUBLIC_API_URL, PUBLIC_API_URL_LOCAL } from '$env/static/public';
import { AUTH_CALLBACK, LOGIN, LOGOUT } from '$lib/constants/routes';
import { getUser } from '$lib/server/utils/get-user';
import { isAqaratechStaff } from '$lib/server/utils/is-aqaratech-staff';
import { validateToken } from '$lib/server/utils/validate';
import { getSentryUser } from '$lib/utils/sentry-utils';
import type { ResponseError } from '@self/sdk';
import * as Sentry from '@sentry/svelte';
import type { ExternalFetch, Handle, HandleError } from '@sveltejs/kit';
import { parse, serialize } from 'cookie';
import { errors } from 'jose';

export const handle: Handle = async ({ event, resolve }) => {
	const now = Date.now();
	const method = event.request.method;
	console.log(
		`${new Date().toISOString()} Request: ${method} ${event.url.href}: ${
			event.routeId
		} ${event.request.headers.get('user-agent')}`,
	);

	const cookies = parse(event.request.headers.get('cookie') || '');

	// A user with an expired token needs a way to re-authenticate,
	// so we don't want to validate the token if the user is trying to log in.
	// If we do want to validate it either way, we need to make sure to not place
	// the user in a redirect loop:
	// idToken expired => redirect to login => idToken expired => redirect to login => ...
	const PUBLIC_ENDPOINTS = [LOGIN, LOGOUT, AUTH_CALLBACK];
	if (cookies.idToken && !PUBLIC_ENDPOINTS.includes(event.url.pathname)) {
		try {
			console.log('validating idToken');
			const payload = await validateToken(cookies.idToken);
			event.locals.isAqaratechStaff = isAqaratechStaff(payload);
			event.locals.isAuthenticated = true;
			// only set idToken in locals if it is valid
			event.locals.idToken = cookies.idToken;
		} catch (e) {
			console.error(e);
			if (e instanceof errors.JWTExpired) {
				return new Response('Session expired', {
					status: 302,
					headers: {
						Location: LOGIN,
					},
				});
			} else {
				console.warn(
					`Invalid idToken: ${cookies.idToken}. Redirecting to ${LOGOUT} .`,
				);
				return new Response('', {
					status: 302,
					headers: {
						Location: LOGOUT,
					},
				});
				// Sentry.captureException(e);
			}
		}

		// attempt to get user from backend, set in locals.user
		// We don't validate accessToken in the frontend. We only pass it along to the server.
		// This will only run if the idToken is valid && the route is not public.
		if (cookies.accessToken) {
			// Don't try to get user if we don't have an accessToken
			// TODO what about public pages? what about public pages when a user is signed in?
			const user = await getUser({
				token: cookies.accessToken,
				selectedRoleId: cookies.xRoleId,
			});
			event.locals.user = user;
			event.locals.accessToken = cookies.accessToken;

			// Place `xRoleId` in locals for it be picked up after `resolve` has been called.
			// After `resolve` is called, xRoleId is serialized into a cookie to persist the role change.
			// Additionally, if the user never changes roles,
			// this will take care of setting & persisting the default role.
			event.locals.xRoleId = user?.role?.id;
		}
	}

	const response = await resolve(event);

	console.log(
		`${new Date().toISOString()} Response: ${Date.now() - now}ms - ${method} ${
			event.url.pathname
		} ${response.status} - ${event.request.headers.get('user-agent')} - ${
			event.locals.user?.email
		}`,
	);

	const maxAge = 60 * 60 * 24 * 7;

	// https://medium.com/swlh/7-keys-to-the-mystery-of-a-missing-cookie-fdf22b012f09
	response.headers.append(
		'Set-Cookie',
		serialize('idToken', event.locals.idToken || '', {
			httpOnly: true,
			path: '/',
			maxAge: event.locals.idToken ? maxAge : 0,
			sameSite: 'none', // TODO research
			secure: true,
		}),
	);

	response.headers.append(
		'Set-Cookie',
		serialize('accessToken', event.locals.accessToken || '', {
			httpOnly: true,
			path: '/',
			maxAge: event.locals.accessToken ? maxAge : 0,
			sameSite: 'none', // TODO research
			secure: true,
		}),
	);

	response.headers.append(
		'Set-Cookie',
		serialize('xRoleId', event.locals.xRoleId || '', {
			httpOnly: true,
			path: '/',
			maxAge: event.locals.xRoleId ? maxAge : 0,
			sameSite: 'none', // TODO research
			secure: true,
		}),
	);

	if (environment.envName !== 'prod') {
		response.headers.set('X-Robots-Tag', 'noindex');
	}
	return response;
};

export const handleError: HandleError = async ({ error, event }) => {
	console.error(error);
	const { locals, params } = event;
	const details = {
		name: 'handleError',
		url: event.url.href,
		locals,
		params,
	};
	console.error(details);

	const thrown = error as Error | ResponseError;
	const res = 'response' in thrown ? thrown.response : undefined;
	if (res) {
		const body = await res.json();
		const resDetails = {
			name: 'Response Error (from handleError)',
			status: res.status,
			url: res.url,
			body,
		};
		console.error(resDetails);
	}

	Sentry.captureException(error, {
		user: getSentryUser(event.locals.user),
	});
};

export const externalFetch: ExternalFetch = async (request) => {
	const basePath = PUBLIC_API_URL;
	const newPath = PUBLIC_API_URL_LOCAL;

	if (basePath && newPath && request.url.startsWith(basePath)) {
		request = new Request(request.url.replace(basePath, newPath), request);
	}

	return fetch(request);
};
