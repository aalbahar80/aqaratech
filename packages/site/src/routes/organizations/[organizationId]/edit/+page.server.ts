import { organizationSchema } from '@self/utils';

import { handleForm } from '$lib/components/form/handle-form';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return await handleForm({
			entity: 'organization',
			schema: organizationSchema,
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.organizations.update({
					id: event.params.organizationId,
					updateOrganizationDto: data,
				});

				return submitted.id;
			},
		});
	},
};
