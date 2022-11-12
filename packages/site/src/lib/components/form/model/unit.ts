import { createFormField } from '$lib/components/form/model/form-field';
import {
	createFormModel,
	type FormTypeEnum,
} from '$lib/components/form/model/form-model';
import { labelHint } from '$lib/constants/form-hints';
import { unitTypeOptions } from '$lib/constants/unit-options';
import { unitCreateSchema, unitUpdateSchema } from '@self/utils';

export const unitFormModel = (pageType: FormTypeEnum) =>
	createFormModel({
		entity: 'unit',
		pageType,
		createSchema: unitCreateSchema,
		updateSchema: unitUpdateSchema,
		fields: {
			unitNumber: createFormField('unitNumber'),

			type: createFormField('type', {
				type: 'select',
				options: unitTypeOptions,
			}),

			bed: createFormField('bed', {
				type: 'number',
			}),

			bath: createFormField('bath', {
				type: 'number',
			}),

			size: createFormField('size'),

			floor: createFormField('floor', {
				type: 'number',
			}),

			marketRent: createFormField('marketRent', {
				type: 'number',
			}),

			usage: createFormField('usage'),

			label: createFormField('label', {
				hint: labelHint,
			}),
		},
	});
