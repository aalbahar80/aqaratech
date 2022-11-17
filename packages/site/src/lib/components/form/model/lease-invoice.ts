import { createFormField } from '$lib/components/form/model/form-field';
import {
	createFormModel,
	type FormTypeEnum,
} from '$lib/components/form/model/form-model';
import {
	leaseInvoiceCreateSchema,
	leaseInvoiceUpdateSchema,
} from '@self/utils';

export const leaseInvoiceFormModel = (pageType: FormTypeEnum) =>
	createFormModel({
		entity: 'leaseInvoice',
		pageType,
		createSchema: leaseInvoiceCreateSchema,
		updateSchema: leaseInvoiceUpdateSchema,
		fields: {
			amount: createFormField('amount', {
				type: 'number',
				required: true,
			}),

			isPaid: createFormField('isPaid', {
				type: 'checkbox',
			}),

			postAt: createFormField('postAt', {
				type: 'date',
				required: true,
			}),

			dueAt: createFormField('dueAt', {
				type: 'date',
			}),

			paidAt: createFormField('paidAt', {
				type: 'date',
			}),

			memo: createFormField('memo'),
		},
	});
