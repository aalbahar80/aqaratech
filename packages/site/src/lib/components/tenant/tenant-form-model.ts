import { createFormField } from '$lib/components/form/form-field';
import { createFormModel } from '$lib/components/form/form-model';
import { labelHint } from '$lib/constants/form-hints';
import { tenantCreateSchema, type TenantCreateSchema } from '@self/utils';

/**
 * Stateless model for a new tenant form.
 */
export const tenantCreateFormModel = () =>
	createFormModel<TenantCreateSchema>({
		schema: tenantCreateSchema,
		entity: 'tenant',
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

			// nationality: createSelectFormField('nationality', {
			// 	options: countries.map((country) => ({
			// 		label: country.name,
			// 		value: country.alpha3Code,
			// 	})),
			// 	autoInit: true,
			// 	combobox: true,
			// }),

			residencyEnd: createFormField('residencyEnd', {
				type: 'date',
				label: 'Residency Expiration',
			}),

			residencyNum: createFormField('residencyNum', {
				label: 'Residency Number',
			}),
		},
	});
