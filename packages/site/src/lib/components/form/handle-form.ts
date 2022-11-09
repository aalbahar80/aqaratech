import { createApi, type Api } from '$api';
import { getRoute, PageType, type Entity } from '@self/utils';
import { invalid, redirect, type RequestEvent } from '@sveltejs/kit';
import type { z } from 'zod';

export const handleForm = async <S extends z.ZodTypeAny>({
	entity,
	schema,
	event,
	onSubmit,
}: Validate<S>) => {
	const { request, fetch, params } = event;

	const data = await request.formData();

	// convert data from FormData to object
	const obj = Object.fromEntries(data.entries());

	const parsed = schema.safeParse(obj);

	if (!parsed.success) {
		const errors = parsed.error.formErrors;
		console.warn({ errors }, '+page.server.ts ~ 19');

		return invalid(400, { ...obj, errors });
	}

	const id = await onSubmit(createApi(fetch), parsed.data as unknown, event);

	const url = getRoute({
		entity: entity,
		id,
		pageType: PageType.Id,
		params,
	});

	throw redirect(303, url);
};

interface Validate<S extends z.ZodTypeAny> {
	entity: Entity;
	schema: S;
	event: RequestEvent;
	/**
	 * `onSubmit` expects an id to be returned, which is used to redirect to the new page.
	 */
	onSubmit: (api: Api, data: z.infer<S>, event) => Promise<string>;
}
