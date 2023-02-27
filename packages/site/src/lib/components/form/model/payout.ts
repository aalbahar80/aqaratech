import { payoutCreateSchema } from '@self/utils';

import { createFormField } from '$lib/components/form/model/form-field';
import { createFormModel } from '$lib/components/form/model/form-model';

export const payoutFormModel = () =>
	createFormModel({
		entity: 'payout',

		createSchema: payoutCreateSchema,
		fields: {
			amount: createFormField('amount', {
				type: 'number',
				required: true,
			}),

			postAt: createFormField('postAt', {
				type: 'date',
				required: true,
			}),

			memo: createFormField('memo', {
				hint: 'A short description of the transaction. The description will be visible to the owner.\n\nوصف موجز للمعاملة. سيكون الوصف مرئيًا للمالك.',
			}),
		},
	});
