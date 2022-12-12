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
				hint: "Note that a transaction cannot be paid before it's post date.\n\nتاريخ الاستحقاق",
			}),

			dueAt: createFormField('dueAt', {
				type: 'date',
				hint: 'If a due date is set, the transaction will be marked as "Past Due" after the due date. If a due date is not set, the transaction will only be marked as "Due" after it\'s post date.',
			}),

			paidAt: createFormField('paidAt', {
				type: 'date',
				hint: 'When was this transaction paid?\n\nتاريخ الدفع',
			}),

			memo: createFormField('memo', {
				hint: 'Enter a short description of the transaction. This will be visible to the tenant user.',
			}),
		},
	});
