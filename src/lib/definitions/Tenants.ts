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
];

const validation = z.object({
	first_name: z.string().min(1, { message: 'Required' }),
	last_name: z.string().min(1, { message: 'Required' }),
	email: z.string().email(),
	phone: z.string().min(8).and(z.string().max(8)).or(z.literal('')),
});

export default {
	title,
	graphqlName,
	graphqlNamePk,
	// docs,
	fieldList,
	validation
};
