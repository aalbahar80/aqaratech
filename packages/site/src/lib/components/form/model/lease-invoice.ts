import {
	leaseInvoiceCreateSchema,
	leaseInvoiceUpdateSchema,
} from '@self/utils';

import { createFormField } from '$lib/components/form/model/form-field';
import { createFormModel } from '$lib/components/form/model/form-model';

export const leaseInvoiceFormModel = () =>
	createFormModel({
		entity: 'leaseInvoice',

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

			paidAt: createFormField('paidAt', {
				type: 'date',
			}),

			memo: createFormField('memo', {
				hint: 'A short description of the transaction. The description will be visible to the tenant.\n\nوصف موجز للمعاملة. سيكون الوصف مرئيًا للمستأجر.',
			}),
		},
	});
