import { countries, tenantCreateSchema, tenantUpdateSchema } from '@self/utils';

import { createFormField } from '$lib/components/form/model/form-field';
import { createFormModel } from '$lib/components/form/model/form-model';
import { labelHint } from '$lib/constants/form-hints';

export const tenantFormModel = () =>
	createFormModel({
		entity: 'tenant',

		createSchema: tenantCreateSchema,
		updateSchema: tenantUpdateSchema,
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

			passportNum: createFormField('passportNum'),

			nationality: createFormField('nationality', {
				type: 'select',
				options: countries.map((country) => ({
					label: country.name,
					value: country.alpha3Code,
				})),
				// autoInit: true,
				combobox: true,
			}),

			residencyEnd: createFormField('residencyEnd', {
				type: 'date',
			}),

			residencyNum: createFormField('residencyNum'),
		},
	});
