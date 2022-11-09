import { createFormField } from '$lib/components/form/form-field';
import {
	createFormModel,
	type FormTypeEnum,
} from '$lib/components/form/form-model';
import { labelHint } from '$lib/constants/form-hints';
import { portfolioCreateSchema, portfolioUpdateSchema } from '@self/utils';

export const portfolioFormModel = (pageType: FormTypeEnum) =>
	createFormModel({
		entity: 'portfolio',
		pageType,
		createSchema: portfolioCreateSchema,
		updateSchema: portfolioUpdateSchema,
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
