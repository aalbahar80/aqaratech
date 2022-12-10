import { handleForm } from '$lib/components/form/handle-form';
import { propertyUpdateSchema } from '@self/utils';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
			entity: 'property',
			schema: propertyUpdateSchema,
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.properties.update({
					id: event.params.propertyId,
					updatePropertyDto: data,
				});

				return submitted.id;
			},
		});
	},
};
