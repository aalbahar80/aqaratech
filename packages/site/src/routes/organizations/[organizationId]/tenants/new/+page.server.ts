import type { Actions } from './$types';

import { tenantCreateSchema } from '@self/utils';

import { handleForm } from '$lib/components/form/handle-form';

export const actions: Actions = {
	default: async (event) => {
		return await handleForm({
			entity: 'tenant',
			schema: tenantCreateSchema,
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.organizations.createTenant({
					organizationId: event.params.organizationId,
					createTenantDto: data,
				});

				return submitted.id;
			},
		});
	},
};
