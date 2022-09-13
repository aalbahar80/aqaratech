import * as Sentry from '@sentry/node';
import type { HandleServerError } from '@sveltejs/kit';

interface RedirectError {
	status: number;
	location: string;
}

export const isRedirectError = (error: any): error is RedirectError => {
	return error.status && error.location;
};

export const captureHandleErrorEvent = ({
	message,
	error,
	event,
	info,
}: {
	message?: string;
	error: unknown;
	event: Parameters<HandleServerError>[0]['event'];
	info: Sentry.Request;
}) => {
	const tags: Sentry.Event['tags'] = {
		name: 'handleServerError',
	};

	if (isRedirectError(error)) {
		message = 'Redirect';
		tags.status = error.status;
		tags.location = error.location;
		tags.redirectFrom = event.url.href;
	}

	Sentry.captureEvent({
		level: 'info',
		message,
		tags,
		request: info,
	});
};
