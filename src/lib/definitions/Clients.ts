import { Field } from '$components/form/Field';
import { z } from 'zod';

export const graphqlName = 'clients';

export const fieldList: Field[] = [
	new Field({
		fieldName: 'id',
		title: 'ID',
		editable: false,
		searchType: 'number',
	}),
	new Field({
		fieldName: 'full_name',
		title: 'Full Name',
		editable: false,
	}),
	new Field({
		fieldName: 'first_name',
		title: 'First Name',
		searchable: false,
	}),
	new Field({
		fieldName: 'second_name',
		title: 'Second Name',
		searchable: false,
	}),
	new Field({
		fieldName: 'third_name',
		title: 'Third Name',
		searchable: false,
	}),
	new Field({
		fieldName: 'last_name',
		title: 'Last Name',
		searchable: false,
	}),
	new Field({
		fieldName: 'email',
		title: 'Email',
	}),
	new Field({
		fieldName: 'phone',
		title: 'Phone',
	}),
];

export const validation = z.object({
	first_name: z.string().min(1, { message: 'Required' }),
	last_name: z.string().min(1, { message: 'Required' }),
	email: z.string().email(),
	phone: z.string().min(8).and(z.string().max(8)).or(z.literal('')),
});
