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

			canPay: createFormField('canPay', {
				type: 'checkbox',
				label: 'Allow tenant to pay invoices online',
			}),

			notify: createFormField('notify', {
				type: 'checkbox',
				label: 'Send payment reminders',
			}),

			tenantId: createFormField('tenantId', {
				type: 'select',
				combobox: true,
				options: [],
			}),
		},
	});
