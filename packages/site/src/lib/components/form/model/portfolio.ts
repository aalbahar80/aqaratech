import { portfolioCreateSchema, portfolioUpdateSchema } from '@self/utils';

import { createFormField } from '$lib/components/form/model/form-field';
import { createFormModel } from '$lib/components/form/model/form-model';
import { labelHint } from '$lib/constants/form-hints';

export const portfolioFormModel = () =>
	createFormModel({
		entity: 'portfolio',

		createSchema: portfolioCreateSchema,
		updateSchema: portfolioUpdateSchema,
		fields: {
			fullName: createFormField('fullName', {
				required: true,
			}),

			label: createFormField('label', {
				hint: labelHint,
			}),

			phone: createFormField('phone'),

			dob: createFormField('dob', {
				type: 'date',
			}),

			civilid: createFormField('civilid'),
		},
	});
