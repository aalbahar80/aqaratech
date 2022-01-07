import { Field } from '$components/form/Field';
import { z } from 'zod';

const title = 'Tenants';
const graphqlName = 'tenants';
const graphqlNamePk = 'tenants_by_pk';

const fieldList: Field[] = [
	new Field({
		fieldName: 'id',
		title: 'ID',
		editable: false,
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
	}),
	new Field({
		fieldName: 'civilid',
		title: 'Civil ID',
		inputType: 'text',
	}),
];

const validation = z.object({
	first_name: z.string().min(1, { message: 'Required' }),
	second_name: z.string().min(1, { message: 'Required' }),
	last_name: z.string().min(1, { message: 'Required' }),
	email: z.string().email(),
	phone: z.string().min(8).and(z.string().max(8)),
	civilid: z.string().min(12).and(z.string().max(12)).or(z.literal('')),
});

export default {
	title,
	graphqlName,
	graphqlNamePk,
	fieldList,
	validation,
};
