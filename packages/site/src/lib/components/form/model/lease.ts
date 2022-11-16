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
				required: true,
			}),

			end: createFormField('end', {
				type: 'date',
				required: true,
			}),

			monthlyRent: createFormField('monthlyRent', {
				type: 'number',
				required: true,
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

			// @ts-expect-error schema.refine() limits zod's type inference
			tenantId: createFormField('tenantId', {
				type: 'select',
				combobox: true,
				options: [],
				hideWhenEdit: true,
				required: true,
			}),

			license: createFormField('license'),
		},
	});
