import { createFormField } from '$lib/components/form/form-field';
import {
	createFormModel,
	type FormTypeEnum,
} from '$lib/components/form/form-model';
import { areas } from '$lib/constants/areas-kwt';
import { labelHint } from '$lib/constants/form-hints';
import { propertyCreateSchema, propertyUpdateSchema } from '@self/utils';

export const propertyFormModel = (pageType: FormTypeEnum) =>
	createFormModel({
		entity: 'property',
		pageType,
		createSchema: propertyCreateSchema,
		updateSchema: propertyUpdateSchema,
		fields: {
			area: createFormField('area', {
				required: true,
				combobox: true,
				options: areas.map((area) => ({
					value: area[1],
					label: `${area[0]} | ${area[1]}`,
				})),
				// autoInit: true,
			}),

			block: createFormField('block', {
				required: true,
			}),

			avenue: createFormField('avenue'),

			street: createFormField('street', {
				required: true,
			}),

			number: createFormField('number', {
				required: true,
			}),

			parcel: createFormField('parcel', {
				required: false,
				hint: 'رقم القسيمة',
			}),

			paci: createFormField('paci', {
				required: false,
				hint: 'الرقم الآلي للعنوان',
			}),

			label: createFormField('label', {
				hint: labelHint,
			}),
		},
	});
