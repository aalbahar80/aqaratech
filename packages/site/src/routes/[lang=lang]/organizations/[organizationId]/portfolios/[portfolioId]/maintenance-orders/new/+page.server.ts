import type { Actions } from './$types';
import { maintenanceOrderCreateSchema } from '@self/utils';

import { handleForm } from '$lib/components/form/handle-form';

export const actions: Actions = {
	default: async (event) => {
		return await handleForm({
			entity: 'maintenanceOrder',
			schema: maintenanceOrderCreateSchema,
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.maintenanceOrders.create({
					organizationId: event.params.organizationId,
					createMaintenanceOrderDto: data,
				});
				return submitted.id;
			},

			fromParams: ['portfolioId'],
			fromQuery: ['propertyId', 'unitId', 'tenantId'],
		});
	},
};
