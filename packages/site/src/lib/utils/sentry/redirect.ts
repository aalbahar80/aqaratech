import * as Sentry from '@sentry/node';
import type { HandleServerError } from '@sveltejs/kit';

interface RedirectError {
	status: number;
	location: string;
}

export const isRedirectError = (error: any): error is RedirectError => {
	return error.status && error.location;
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
