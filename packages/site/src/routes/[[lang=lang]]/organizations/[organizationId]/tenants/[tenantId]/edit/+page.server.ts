import type { Actions } from './$types';

import { tenantUpdateSchema } from '@self/utils';

import { handleForm } from '$lib/components/form/handle-form';

export const actions: Actions = {
	default: async (event) => {
		return await handleForm({
			entity: 'tenant',
			schema: tenantUpdateSchema,
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.tenants.update({
					id: event.params.tenantId,
					updateTenantDto: data,
				});

				return submitted.id;
			},
		});
	},
};
