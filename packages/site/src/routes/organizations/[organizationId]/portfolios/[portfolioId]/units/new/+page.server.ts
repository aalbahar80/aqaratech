import { unitCreateSchema } from '@self/utils';

import { handleForm } from '$lib/components/form/handle-form';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
			entity: 'unit',
			schema: unitCreateSchema,
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.organizations.createUnit({
					organizationId: event.params.organizationId,
					createUnitDto: data,
				});

				return submitted.id;
			},

			fromParams: ['portfolioId'],
			fromQuery: ['propertyId'],
		});
	},
};
