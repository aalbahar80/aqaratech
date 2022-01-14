import { Field } from '$components/form/Field';
import { z } from 'zod';

const title = 'Tenants';
const graphqlName = 'tenants';

const fieldList: Field[] = [
	new Field({
		fieldName: 'id',
		title: 'ID',
		editable: false,
		searchType: 'number',
	}),
	new Field({
		fieldName: 'first_name',
		title: 'First Name',
		inputType: 'text',
	}),
	new Field({
		fieldName: 'second_name',
		title: 'Second Name',
		inputType: 'text',
	}),
	new Field({
		fieldName: 'third_name',
		title: 'Third Name',
		inputType: 'text',
	}),
	new Field({
		fieldName: 'last_name',
		title: 'Last Name',
		inputType: 'text',
	}),
	new Field({
		fieldName: 'email',
		title: 'Email',
		inputType: 'email',
	}),
	new Field({
		fieldName: 'phone',
		title: 'Phone',
		inputType: 'tel',
	}),
	new Field({
		fieldName: 'dob',
		title: 'Date of Birth',
		inputType: 'date',
		searchable: false,
	}),
	new Field({
		fieldName: 'civilid',
		title: 'Civil ID',
		inputType: 'text',
		// TODO: change after removing bigint type
		searchType: 'number',
	}),
];

const validation = z.object({
	first_name: z.string().min(1, { message: 'Required' }),
	second_name: z.string().min(1, { message: 'Required' }),
	last_name: z.string().min(1, { message: 'Required' }),
	email: z.string().email(),
	phone: z.string().min(8).and(z.string().max(8)),
	// civilid: z.string().min(12).and(z.string().max(12)).or(z.literal('')),
	// civilid: z
	// 	.string()
	// 	.refine((val) => val.length === 12, {
	// 		message: 'Civil ID must be 12 characters',
	// 	}),
	civilid: z.preprocess(
		(val) => (val as string).toString(),
		// check if civil id is 12 characters or blank
		z
			.string()
			.refine((val) => val.length === 12 || val.length === 0, {
				message: 'Civil ID must be 12 characters or blank',
			})
			.and(
				// check if civil id contains only numbers, if any
				z.string().refine(
					(val) =>
						// check if val contains only numbers
						val.length === 0 || val.match(/^[0-9]+$/) !== null,
					{ message: 'Civil ID must contain only numbers' },
				),
			),
	),
});

export default {
	title,
	graphqlName,
	fieldList,
	validation,
};
