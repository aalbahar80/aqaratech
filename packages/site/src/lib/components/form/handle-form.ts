import { createApi, type Api } from '$api';
import { ResponseError } from '$api/openapi';
import { parseApiError } from '$api/parse-api-error';
import { getRoute, PageType, type Entity } from '@self/utils';
import { invalid, redirect, type RequestEvent } from '@sveltejs/kit';
import type { z } from 'zod';

export const handleForm = async <
	S extends z.ZodTypeAny,
	Event extends RequestEvent,
>({
	entity,
	schema,
	event,
	onSubmit,
	fromParams,
	fromQuery,
	redirectTo,
}: {
	entity: Entity;
	schema: S;
	event: Event;
	fromParams?: string[];
	fromQuery?: string[];
	/**
	 * Override the default redirect behavior.
	 */
	redirectTo?: string;
	/**
	 * `onSubmit` expects an id to be returned, which is used to redirect to the new page.
	 */
	onSubmit: (api: Api, data: z.infer<S>, event: Event) => Promise<string>;
}) => {
	const { request, fetch, params } = event;

	const data = await request.formData();

	// convert data from FormData to object
	const obj = Object.fromEntries(data.entries());

	// add params to object
	if (fromParams) {
		for (const param of fromParams) {
			obj[param] = params[param];
		}
	}

	// add query to object
	if (fromQuery) {
		for (const query of fromQuery) {
			obj[query] = event.url.searchParams.get(query);
		}
	}

	const parsed = schema.safeParse(obj);

	if (!parsed.success) {
		// cast type to populate ActionData type
		const errors = parsed.error.formErrors as z.typeToFlattenedError<
			z.infer<S>
		>;
		console.warn({ errors }, '+page.server.ts ~ 19');

		return invalid(400, { ...(obj as z.infer<S>), errors });
	}

	let id: string;

	try {
		// We pass the original object to onSubmit, not the parsed one
		// This is to avoid transforming the data twice, which in the case of short dates (yyyy-mm-dd) will fail.
		id = await onSubmit(createApi(fetch), obj as unknown, event);
	} catch (error) {
		console.error(error);

		if (error instanceof ResponseError) {
			// Handle API errors and return the message to the user
			const data = await parseApiError(error);

			return invalid(400, {
				...(obj as z.infer<S>),
				errors: toFormErrors([data.message]),
			});
		}
	}

	const url =
		redirectTo ??
		getRoute({
			entity: entity,
			id,
			pageType: PageType.Id,
			params,
		});
	throw redirect(303, url);
};

const toFormErrors = <Schema extends z.ZodTypeAny>(
	formErrors: string[],
): z.typeToFlattenedError<z.infer<Schema>> => {
	return {
		formErrors,
		fieldErrors: {},
	};
};
