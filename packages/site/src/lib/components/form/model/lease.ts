import { createFormField } from '$lib/components/form/model/form-field';
import {
	createFormModel,
	type FormTypeEnum,
} from '$lib/components/form/model/form-model';
import { leaseCreateSchema, leaseUpdateSchema } from '@self/utils';

export const leaseFormModel = (pageType: FormTypeEnum) =>
	createFormModel({
		entity: 'lease',
		pageType,
		createSchema: leaseCreateSchema,
		updateSchema: leaseUpdateSchema,
		fields: {
			start: createFormField('start', {
				type: 'date',
			}),

			end: createFormField('end', {
				type: 'date',
			}),

			monthlyRent: createFormField('monthlyRent', {
				type: 'number',
			}),

			deposit: createFormField('deposit', {
				type: 'number',
			}),

			canPay: createFormField('canPay', {
				type: 'checkbox',
			}),

			notify: createFormField('notify', {
				type: 'checkbox',
			}),

			tenantId: createFormField('tenantId', {
				type: 'select',
				combobox: true,
				options: [],
				hideWhenEdit: true,
			}),
		},
	});
