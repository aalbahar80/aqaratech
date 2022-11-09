import { handleForm } from '$lib/components/form/handle-form';
import { tenantUpdateSchema } from '@self/utils';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
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
