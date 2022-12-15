import { maintenanceOrderUpdateSchema } from '@self/utils';

import { handleForm } from '$lib/components/form/handle-form';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
			entity: 'maintenanceOrder',
			schema: maintenanceOrderUpdateSchema,
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.maintenanceOrders.update({
					id: event.params.maintenanceOrderId,
					updateMaintenanceOrderDto: data,
				});

				return submitted.id;
			},
		});
	},
};
