import { handleForm } from '$lib/components/form/handle-form';
import { environment } from '$lib/environment';
import { fileCreateSchema } from '@self/utils';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
			entity: 'file',
			schema: fileCreateSchema,
			event,
			fromQuery: ['relationKey', 'relationValue'],
			onSubmit: async (_api, data, event) => {
				// Avoid using FilesApi.createFile() because of a bug with uploading files.

				const formData = new FormData();

				for (const key in data) {
					formData.append(key, data[key]);
				}

				const url = `${environment.PUBLIC_API_URL}/organizations/${event.params.organizationId}/files`;

				await event.fetch(url, {
					method: 'POST',
					credentials: 'include',
					body: formData,
				});

				return data;
			},

			redirectTo: () => event.url.searchParams.get('redirectTo') ?? '/',
		});
	},
};
