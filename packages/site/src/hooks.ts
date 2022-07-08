import { dev } from '$app/env';
import { environment } from '$environment';
import { getUser } from '$lib/server/utils/getAuthz';
import * as Sentry from '@sentry/node';
import type { GetSession, Handle, HandleError } from '@sveltejs/kit';
import { parse, serialize } from 'cookie';

if (
	process.env.VERCEL_ENV === 'production' ||
	process.env.VERCEL_ENV === 'preview'
) {
	Sentry.init({
		dsn: 'https://9b3cb0c95789401ea34643252fed4173@o1210217.ingest.sentry.io/6345874',
		tracesSampleRate: 0.25,
		release: import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA ?? 'localServerRelease',
		environment: process.env.VERCEL
			? process.env.VERCEL_GIT_COMMIT_REF
			: 'localServer',
		debug: dev,
	});
}

export const getSession: GetSession = async ({ locals }) => ({
	user: locals.user,
	accessToken: locals.accessToken,
});

export const handle: Handle = async ({ event, resolve }) => {
	// TODO cast cookie type to avoid typos. OpenApi Auth0 type?
	const cookies = parse(event.request.headers.get('cookie') || '');

	event.locals.idToken = cookies.idToken || '';
	event.locals.accessToken = cookies.accessToken || '';

	const user = await getUser(cookies.idToken);
	event.locals.user = user;

	const response = await resolve(event);
	response.headers.append(
		'Set-Cookie',
		serialize('idToken', event.locals.idToken, {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'none', // TODO research
			secure: true,
		}),
	);

	response.headers.append(
		'Set-Cookie',
		serialize('accessToken', event.locals.accessToken, {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'none', // TODO research
			secure: true,
		}),
	);

	if (environment.envName !== 'prod') {
		response.headers.set('X-Robots-Tag', 'noindex'); // TODO remove in prod
	}
	return response;
};

export const handleError: HandleError = async ({ error, event }) => {
	console.error('Error (from handleError):', error);
	const { locals, params } = event;
	const details = {
		name: 'handleError',
		url: event.url.href,
		locals,
		params,
	};
	console.error(details);

	// @ts-ignore
	const res = error?.response as Response | undefined;
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

	const user = event.locals.user;
	Sentry.captureException(error, {
		user: {
			id: user?.id || '',
			email: user?.email || '',
			username: user?.fullName || '',
		},
	});
};
