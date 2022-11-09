import { createFormField } from '$lib/components/form/form-field';
import { createFormModel } from '$lib/components/form/form-model';
import { labelHint } from '$lib/constants/form-hints';
import { portfolioCreateSchema, portfolioUpdateSchema } from '@self/utils';

export const portfolioFormModel = () =>
	createFormModel({
		createSchema: portfolioCreateSchema,
		updateSchema: portfolioUpdateSchema,
		entity: 'portfolio',
		fields: {
			fullName: createFormField('fullName', {
				required: true,
				label: 'Portfolio Name (full)',
			}),

			label: createFormField('label', {
				hint: labelHint,
			}),

			phone: createFormField('phone'),

			dob: createFormField('dob', {
				type: 'date',
				label: 'Date of Birth',
			}),

			civilid: createFormField('civilid', {
				label: 'Civil ID',
			}),
		},
	});
