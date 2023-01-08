import * as Sentry from '@sentry/node';
import { error } from '@sveltejs/kit';

import type { Actions } from './$types';

import { fileCreateSchema } from '@self/utils';

import { handleForm } from '$lib/components/form/handle-form';
import { REDIRECT_TO } from '$lib/constants/misc';
import { environment } from '$lib/environment';

export const actions: Actions = {
	default: async (event) => {
		return await handleForm({
			entity: 'file',
			schema: fileCreateSchema,
			event,
			fromQuery: ['relationKey', 'relationValue'],
			onSubmit: async (_api, data, event) => {
				// Avoid using FilesApi.createFile() because of a bug with uploading files.

				const formData = new FormData();

				for (const key in data) {
					const value: unknown = data[key];
					if (value instanceof Blob || typeof value === 'string') {
						formData.append(key, value);
					}
				}

				// Use non-public URL to post file
				const url = `${environment.PUBLIC_API_URL_LOCAL}/organizations/${event.params.organizationId}/files`;

				const res = await event.fetch(url, {
					method: 'POST',
					credentials: 'include',
					body: formData,
				});

				if (!res.ok) {
					// required since fetch doesn't throw on 4xx/5xx

					// log error on server
					console.error('Error while creating file', res);

					// log error on sentry
					Sentry.captureException(
						new Error(`Failed to create file: ${res.statusText}`),
						{
							tags: {
								routeId: event.route.id,
								pathname: event.url.pathname,
								status: res.status,
							},
							extra: {
								href: event.url.href,
								params: event.params,
								query_string: event.url.search,
								backendUrl: url,
							},
							requestSession: {
								status: 'errored',
							},
						},
					);

					// return error to client. If error status is *not* 400, handleForm will render error page.
					throw error(res.status, res.statusText);
				}

				return data;
			},

			redirectTo: () => event.url.searchParams.get(REDIRECT_TO) ?? '/',
		});
	},
};
