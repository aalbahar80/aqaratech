import {
	maintenanceOrderCreateSchema,
	maintenanceOrderUpdateSchema,
} from '@self/utils';

import { createFormField } from '$lib/components/form/model/form-field';
import { createFormModel } from '$lib/components/form/model/form-model';
import { maintenanceStatusOptions } from '$lib/constants/maintenance-status-options';

export const maintenanceOrderFormModel = () =>
	createFormModel({
		entity: 'maintenanceOrder',

		createSchema: maintenanceOrderCreateSchema,
		updateSchema: maintenanceOrderUpdateSchema,
		excludedFields: ['tenantId'],
		fields: {
			title: createFormField('title'),

			description: createFormField('description', {
				type: 'textarea',
			}),

			status: createFormField('status', {
				type: 'select',
				options: maintenanceStatusOptions(),
			}),

			completedAt: createFormField('completedAt', {
				type: 'date',
			}),
		},
	});
