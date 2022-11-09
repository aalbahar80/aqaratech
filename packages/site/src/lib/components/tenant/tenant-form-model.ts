import { createFormField } from '$lib/components/form/form-field';
import {
	createFormModel,
	type FormTypeEnum,
} from '$lib/components/form/form-model';
import { countries } from '$lib/constants/countries';
import { labelHint } from '$lib/constants/form-hints';
import { tenantCreateSchema, tenantUpdateSchema } from '@self/utils';

export const tenantFormModel = (pageType: FormTypeEnum) =>
	createFormModel({
		entity: 'tenant',
		pageType,
		createSchema: tenantCreateSchema,
		updateSchema: tenantUpdateSchema,
		fields: {
			fullName: createFormField('fullName', {
				required: true,
				label: 'Tenant Name (full)',
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

			passportNum: createFormField('passportNum', {
				label: 'Passport Number',
			}),

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
				label: 'Residency Expiration',
			}),

			residencyNum: createFormField('residencyNum', {
				label: 'Residency Number',
			}),
		},
	});
