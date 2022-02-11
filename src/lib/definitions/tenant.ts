import { Field } from '$components/form/Field';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

export type TenantData = Prisma.TenantGetPayload<typeof entityData>;
export const entityData = Prisma.validator<Prisma.TenantArgs>()({
	select: {
		id: true,
		firstName: true,
		lastName: true,
		email: true,
		phone: true,
		dob: true,
		civilid: true,
	},
});

export const defaultForm: Omit<TenantData, 'id'> = {
	firstName: null,
	lastName: null,
	phone: null,
	email: null,
	dob: null,
	civilid: null,
};

export const formSchema = z.object({
	firstName: z.string().min(1, { message: 'Required' }),
	lastName: z.string().min(1, { message: 'Required' }),
	email: z.string().email(),
	phone: z.string().min(8).and(z.string().max(8)),
	civilid: z
		.string()
		.min(12)
		.and(z.string().max(12))
		.or(z.literal(''))
		.refine((val) => val.length === 0 || val.match(/^[0-9]+$/) !== null, {
			message: 'Civil ID must contain only numbers',
		}),
});

export const fieldList: Field[] = [
	new Field({
		fieldName: 'id',
		title: 'ID',
		editable: false,
		searchType: 'number',
		searchable: false,
		visibileInTable: true,
	}),
	new Field({
		fieldName: 'full_name',
		title: 'Name',
		editable: false,
		visibileInTable: true,
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
		inputType: 'email',
		visibileInTable: true,
	}),
	new Field({
		fieldName: 'phone',
		title: 'Phone',
		inputType: 'tel',
		visibileInTable: true,
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
	}),
];

export default { formSchema, defaultForm };
