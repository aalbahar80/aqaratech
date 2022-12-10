import { handleForm } from '$lib/components/form/handle-form';
import { tenantCreateSchema } from '@self/utils';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
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
