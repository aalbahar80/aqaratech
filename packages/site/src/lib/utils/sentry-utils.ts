import type { User } from '$lib/models/types/auth.type';
import * as Sentry from '@sentry/node';
import type { Span } from '@sentry/tracing';
import type { HandleServerError, RequestEvent } from '@sveltejs/kit';

export const getSentryUser = (user: User | undefined) => ({
	id: user?.id || '',
	email: user?.email || '',
	username: user?.fullName || '',
	roleId: user?.role?.id || '',
});

/**
 * add custom meta tags to the head of the page
 */
export const addTraceToHead = ({
	html,
	span,
}: {
	html: string;
	span: Span;
}) => {
	const metaTags = {
		'sentry-trace': span.toTraceparent(),
		// TODO: add baggage: https://docs.sentry.io/platforms/javascript/performance/connect-services/#pageload
	};

	const customMetaTagsHtml = Object.entries(metaTags)
		.map(([name, content]) => `<meta name="${name}" content="${content}">`)
		.join('');

	const modifiedHtml = html.replace('<head>', `<head>${customMetaTagsHtml}`);

	return modifiedHtml;
};

interface RedirectError {
	status: number;
	location: string;
}

export const isRedirectError = (error: any): error is RedirectError => {
	return error.status && error.location;
};

export const extractRequestInfo = (event: RequestEvent): Sentry.Request => {
	const info = {
		// TODO event vs request?
		method: event.request.method,
		url: event.request.url,
		headers: Object.fromEntries(event.request.headers),
		query_string: event.url.search,
		data: event.request.json(),
	};

	return info;
};

export const captureRedirectError = ({
	error,
	event,
	info,
}: {
	error: RedirectError;
	event: Parameters<HandleServerError>[0]['event'];
	info: Sentry.Request;
}) => {
	Sentry.captureEvent({
		message: 'Redirect',
		tags: {
			name: 'handleServerError',
			redirectFrom: event.url.href,
			status: error.status,
			location: error.location,
		},
		request: info,
	});
};
