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
				hint: 'Enter a short description of the payout. This will be visible to the portfolio user.',
			}),
		},
	});
