import { createApi } from '$api';
import { getRoute, PageType, tenantCreateSchema } from '@self/utils';
import { invalid, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, fetch, params }) => {
		const data = await request.formData();

		// convert data from FormData to object
		const obj = Object.fromEntries(data.entries());

		const parsed = tenantCreateSchema.safeParse(obj);

		if (!parsed.success) {
			console.log(parsed.error);
			// TODO: format zod errors where key is the field name, and value is the error message(s)
			// const errors = parsed.error.flatten().fieldErrors;

			const errors = parsed.error.formErrors;
			console.warn({ errors }, '+page.server.ts ~ 19');

			return invalid(400, { ...obj, errors });
		}

		const submitted = await createApi(fetch).organizations.createTenant({
			organizationId: params.organizationId,
			createTenantDto: parsed.data,
		});

		const url = getRoute({
			entity: 'tenant',
			id: submitted.id,
			pageType: PageType.Id,
			params,
		});

		throw redirect(303, url);
	},
};
