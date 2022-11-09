import { createFormModel } from '$lib/components/form/form-model';
import { countries } from '$lib/constants/countries';
import { labelHint } from '$lib/constants/form-hints';
import { Field, SelectField } from '$lib/models/classes/Field.class';
import { tenantCreateSchema, type TenantCreateSchema } from '@self/utils';

export const tenantFormModel = createFormModel<TenantCreateSchema>({
	schema: tenantCreateSchema,
	entity: 'tenant',
	fields: {
		fullName: new Field('fullName', {
			required: true,
			// value: data?.fullName,
			label: 'Tenant Name (full)',
		}),
		label: new Field('label', {
			// value: data?.label,
			hint: labelHint,
		}),
		phone: new Field('phone', {
			// value: data?.phone,
		}),
		dob: new Field('dob', {
			type: 'date',
			label: 'Date of Birth',
			// value: data?.dob?.split('T')[0],
		}),
		civilid: new Field('civilid', {
			label: 'Civil ID',
			// value: data?.civilid,
		}),
		passportNum: new Field('passportNum', {
			label: 'Passport Number',
			// value: data?.passportNum,
		}),
		nationality: new SelectField('nationality', {
			// value: data?.nationality || null,
			options: countries.map((country) => ({
				label: country.name,
				value: country.alpha3Code,
			})),
			autoInit: true,
			combobox: true,
		}),
		residencyNum: new Field('residencyNum', {
			label: 'Residency Number',
			// value: data?.residencyNum,
		}),
		residencyEnd: new Field('residencyEnd', {
			type: 'date',
			label: 'Residency Expiration',
			// value: data?.residencyEnd?.split('T')[0],
		}),
	},
});
