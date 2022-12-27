import type { User } from '$lib/models/types/auth.type';
import type { Span } from '@sentry/tracing';
import type { RequestEvent } from '@sveltejs/kit';

export const getSentryUser = (user: User | undefined) => ({
	id: user?.id ?? '',
	email: user?.email ?? '',
	username: user?.fullName ?? '',
	roleId: user?.role?.id ?? '',
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

export const extractRequestInfo = (event: RequestEvent) => {
	const info = {
		// TODO event vs request?
		method: event.request.method,
		url: event.request.url,
		// add headers except cookie
		headers: Object.fromEntries(
			Object.entries(event.request.headers).filter(([key]) => key !== 'cookie'),
		),
		query_string: event.url.search,
	};

	return info;
};
