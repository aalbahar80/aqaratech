import { createFormField } from '$lib/components/form/model/form-field';
import {
	createFormModel,
	type FormTypeEnum,
} from '$lib/components/form/model/form-model';
import { fileCreateSchema } from '@self/utils';

export const fileFormModel = (pageType: FormTypeEnum) =>
	createFormModel({
		entity: 'file',
		pageType,
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
