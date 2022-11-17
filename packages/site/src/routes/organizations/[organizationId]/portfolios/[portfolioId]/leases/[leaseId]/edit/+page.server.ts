import { handleForm } from '$lib/components/form/handle-form';
import { leaseUpdateSchema } from '@self/utils';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
			entity: 'lease',
			schema: leaseUpdateSchema,
			event,
			checkboxKeys: ['canPay', 'notify'],
			onSubmit: async (api, data, event) => {
				const submitted = await api.leases.update({
					id: event.params.leaseId,
					updateLeaseDto: data,
				});

				return submitted.id;
			},
		});
	},
};
