import type { Actions } from './$types';

import { leaseUpdateSchema } from '@self/utils';

import { handleForm } from '$lib/components/form/handle-form';

export const actions: Actions = {
	default: async (event) => {
		return await handleForm({
			entity: 'lease',
			schema: leaseUpdateSchema,
			event,
			checkboxKeys: {
				canPay: true,
				notify: true,
			},
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
