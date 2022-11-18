import { handleForm } from '$lib/components/form/handle-form';
import { organizationSchema } from '@self/utils';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
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
