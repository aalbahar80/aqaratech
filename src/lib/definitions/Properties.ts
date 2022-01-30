import { Field } from '$components/form/Field';
import { z } from 'zod';

export const graphqlName = 'properties';

export const fieldList: Field[] = [
	new Field({
		fieldName: 'id',
		title: 'ID',
		editable: false,
		searchType: 'number',
		visibileInTable: true,
	}),
	new Field({
		fieldName: 'area',
		title: 'Area',
		searchType: 'text',
		visibileInTable: true,
	}),
	new Field({
		fieldName: 'block',
		title: 'Block',
		searchable: false,
		visibileInTable: true,
	}),
	new Field({
		fieldName: 'street',
		title: 'St',
		searchType: 'text',
	}),
	new Field({
		fieldName: 'avenue',
		title: 'Ave',
		visibile: false,
		searchable: false,
	}),
	new Field({
		fieldName: 'number',
		title: 'Number',
		searchable: false,
		visibileInTable: true,
	}),
];

export const validation = z.object({
	area: z.string().min(1, { message: 'Required' }),
	block: z.string().min(1, { message: 'Required' }),
	street: z.string().min(1, { message: 'Required' }),
	number: z.string().min(1, { message: 'Required' }),
});
