import { handleForm } from '$lib/components/form/handle-form';
import { organizationSchema } from '@self/utils';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
			entity: 'organization',
			schema: organizationSchema,
			event,
			onSubmit: async (api, data) => {
				const submitted = await api.organizations.create({
					createOrganizationDto: data,
				});

				return submitted.organization.id;
			},
		});
	},
};
