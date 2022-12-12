import { payoutCreateSchema } from '@self/utils';

import { handleForm } from '$lib/components/form/handle-form';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
			entity: 'payout',
			schema: payoutCreateSchema,
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.organizations.createPayout({
					organizationId: event.params.organizationId,
					createPayoutDto: data,
				});

				return submitted.id;
			},

			fromParams: ['portfolioId'],
		});
	},
};
