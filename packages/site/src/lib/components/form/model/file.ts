import { fileCreateSchema } from '@self/utils';

import { createFormField } from '$lib/components/form/model/form-field';
import { createFormModel } from '$lib/components/form/model/form-model';

export const fileFormModel = () =>
	createFormModel({
		entity: 'file',

		createSchema: fileCreateSchema,
		excludedFields: ['relationKey', 'relationValue'],
		fields: {
			fileName: createFormField('fileName'),

			file: createFormField('file', {
				type: 'file',
				required: true,
			}),
		},
	});
