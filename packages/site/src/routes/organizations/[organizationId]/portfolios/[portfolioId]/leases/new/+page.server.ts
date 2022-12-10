import { handleForm } from '$lib/components/form/handle-form';
import { leaseCreateSchema } from '@self/utils';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
			entity: 'lease',
			schema: leaseCreateSchema,
			event,
			checkboxKeys: {
				canPay: true,
				notify: true,
			},
			onSubmit: async (api, data, event) => {
				const submitted = await api.organizations.createLease({
					organizationId: event.params.organizationId,
					createLeaseDto: data,
				});

				return submitted.id;
			},

			fromParams: ['portfolioId'],
			fromQuery: ['unitId'],
		});
	},
};
