import { fail, redirect, type RequestEvent } from '@sveltejs/kit';

import {
	getRoute,
	PageType,
	type EditableSchemaKeys,
	type Entity,
	type InnerSchema,
	type KeyOfSchema,
} from '@self/utils';

import { handleCheckboxes } from '$lib/components/form/handle-checkbox';
import type { PickBooleans } from '$lib/components/form/only-booleans';
import { objectKeys } from '$lib/utils/common';

import type { z } from 'zod';

import { createApi, type Api } from '$api';
import { ResponseError } from '$api/openapi';
import { parseApiError } from '$api/parse-api-error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormKeyValue = any;

type MergeKeys<
	TParams extends string,
	TQuery extends string,
	TSchema extends string,
> = {
	[K in TParams]: FormKeyValue;
} & {
	[K in TQuery]: FormKeyValue;
} & {
	[K in EditableSchemaKeys<TSchema>]: FormKeyValue;
};

export const handleForm = async <
	S extends z.ZodTypeAny,
	Event extends RequestEvent,
	Submitted,
	FromParams extends string,
	FromQuery extends string,
	TFormData = MergeKeys<FromParams, FromQuery, KeyOfSchema<S>>,
>({
	entity,
	schema,
	event,
	onSubmit,
	fromParams,
	fromQuery,
	redirectTo,
	checkboxKeys,
}: {
	entity: Entity;
	schema: S;
	event: Event;
	fromParams?: FromParams[];
	fromQuery?: FromQuery[];
	/**
	 * Override the default redirect behavior.
	 */
	redirectTo?: (data: Submitted) => string;
	/**
	 * `onSubmit` expects an id to be returned, which is used to redirect to the new page.
	 */
	onSubmit: (api: Api, data: TFormData, event: Event) => Promise<Submitted>;
	/**
	 * Checkboxes are handled weirdly by HTML forms, so we convert them to booleans.
	 */
	checkboxKeys?: PickBooleans<z.infer<InnerSchema<S>>>;
}) => {
	const { request, fetch, params } = event;

	const formData = await request.formData();

	// convert FormData to object
	const data: Record<string, unknown> = Object.fromEntries(formData.entries());

	if (checkboxKeys) {
		// @ts-expect-error index signature
		handleCheckboxes(data, objectKeys(checkboxKeys));
	}

	// add params to object
	if (fromParams) {
		for (const param of fromParams) {
			const value = params[param];
			if (!value) {
				throw new Error(`Missing param: ${param}`);
			} else {
				data[param] = value;
			}
		}
	}

	// add query to object
	if (fromQuery) {
		for (const query of fromQuery) {
			const value = event.url.searchParams.get(query);
			data[query] = value;
		}
	}

	const parsed = schema.safeParse(data);

	if (!parsed.success) {
		// cast type to populate ActionData type
		const errors = parsed.error.formErrors as z.typeToFlattenedError<
			z.infer<S>
		>;

		console.dir(
			{ location: 'handle-form', obj: data, errors },
			{ depth: null, colors: true },
		);

		return fail(400, { ...(data as z.infer<S>), errors });
	}

	try {
		// We pass the original object to onSubmit, not the parsed one
		// This is to avoid transforming the data twice, which in the case of short dates (yyyy-mm-dd) will fail.
		const submitted = await onSubmit(
			createApi(fetch),
			data as TFormData,
			event,
		);

		let url: string;

		if (redirectTo) {
			url = redirectTo(submitted);
		} else if (typeof submitted === 'string') {
			url = getRoute({
				entity: entity,
				id: submitted,
				pageType: PageType.Id,
				// @ts-expect-error index signature
				params,
			});
		} else {
			throw new Error(
				'Either return a string in `onSubmit` or provide a `redirectTo` function that return a url.',
			);
		}

		throw redirect(303, url);
	} catch (error) {
		// Here, we are only interested in errors related to the form submission.
		// Other errors are handled by hooks.handleError.
		if (!(error instanceof ResponseError)) {
			throw error;
		}

		const res = await parseApiError(error);

		if (res.status !== 400) {
			throw error;
		}

		// Handle API errors and return the message to the user

		return fail(400, {
			...(data as z.infer<S>),
			errors: toFormErrors([res.message]),
		});
	}
};

const toFormErrors = <Schema extends z.ZodTypeAny>(
	formErrors: string[],
): z.typeToFlattenedError<z.infer<Schema>> => {
	return {
		formErrors,
		fieldErrors: {},
	};
};
