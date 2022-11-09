import { createFormField } from '$lib/components/form/form-field';
import { createFormModel } from '$lib/components/form/form-model';
import { countries } from '$lib/constants/countries';
import { labelHint } from '$lib/constants/form-hints';
import type { TenantCreateSchema, TenantUpdateSchema } from '@self/utils';
import type { z } from 'zod';

type TenantSchemas = TenantCreateSchema | TenantUpdateSchema;

export const tenantFormModel = <S extends z.ZodType<TenantSchemas>>(
	schema: S,
) =>
	createFormModel<TenantCreateSchema | TenantUpdateSchema>({
		schema,
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
