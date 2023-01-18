import type { Actions } from './$types';
import { propertyCreateSchema } from '@self/utils';

import { handleForm } from '$lib/components/form/handle-form';

export const actions: Actions = {
	default: async (event) => {
		return await handleForm({
			entity: 'property',
			schema: propertyCreateSchema,
			event,
			fromParams: ['portfolioId'],
			onSubmit: async (api, data, event) => {
				const submitted = await api.organizations.createProperty({
					organizationId: event.params.organizationId,
					createPropertyDto: {
						...data,
						portfolioId: event.params.portfolioId,
					},
				});

				return submitted.id;
			},
		});
	},
};
