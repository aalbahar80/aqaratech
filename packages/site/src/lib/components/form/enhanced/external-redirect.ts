import { applyAction } from '$app/forms';

import type { SubmitFunction } from '@sveltejs/kit/types';

/**
 * Uses `window.location` instead of `goto` if the `result` is a `redirect.`
 * Otherwise, uses the default behaviour.
 *
 * Reason: `goto` should not be used for external redirects. If used,
 * an error will be thrown client-side. Note that the redirect will
 * still work, but the error will be logged to the console/Sentry.
 *
 *  https://kit.svelte.dev/docs/modules#$app-navigation-goto
 */
export const externalRedirect: SubmitFunction = () => {
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	return async ({ result }) => {
		if (result.type === 'redirect') {
			// @ts-expect-error overkill
			window.location = result.location;
		} else {
			await applyAction(result);
		}
	};
};
