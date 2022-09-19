import type { RequestEvent } from '@sveltejs/kit';

interface RedirectError {
	status: number;
	location: string;
}

/**
 * Check if the error is a 404.
 */
export const isRedirectError = (
	error: any,
	event: RequestEvent,
): error is RedirectError => {
	// https://kit.svelte.dev/docs/hooks#shared-hooks-handleerror
	return event.routeId === null;
};
