import { handleForm } from '$lib/components/form/handle-form';
import { unitUpdateSchema } from '@self/utils';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
			entity: 'unit',
			schema: unitUpdateSchema,
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.units.update({
					id: event.params.unitId,
					updateUnitDto: data,
				});

				return submitted.id;
			},
		});
	},
};
