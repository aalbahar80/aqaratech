import { Field } from '$components/form/Field';
import { z } from 'zod';
import { parseISO } from 'date-fns';

const title = 'Leases';
const graphqlName = 'leases';

export const fieldList = [
	new Field({
		fieldName: 'id',
		title: 'ID',
		editable: false,
		searchType: 'number',
	}),
	new Field({
		fieldName: 'start_date',
		title: 'Start',
		inputType: 'date',
		searchable: false,
	}),
	new Field({
		fieldName: 'end_date',
		title: 'End',
		inputType: 'date',
		searchable: false,
	}),
	new Field({
		fieldName: 'is_expired',
		title: 'Expired?',
		editable: false,
		searchable: false,
	}),
	new Field({
		fieldName: 'is_signed',
		title: 'Signed?',
		editable: false,
		searchable: false,
	}),
	new Field({
		fieldName: 'monthly_rent',
		title: 'Rent (KD)',
		inputType: 'number',
		searchType: 'number',
	}),
	new Field({
		fieldName: 'deposit',
		title: 'Deposit (KD)',
		inputType: 'number',
		searchType: 'number',
	}),
	new Field({
		fieldName: 'license',
		title: 'License',
		searchType: 'text',
	}),
	new Field({
		fieldName: 'unit_id',
		title: 'Unit ID',
		editable: false,
		searchType: 'number',
	}),
];

const validation = z
	.object({
		// validate that start_date is an iso string
		start_date: z.string().refine((val) => Date.parse(val), {
			message: 'Start date must be an ISO string',
		}),

		end_date: z.string().refine((val) => Date.parse(val), {
			message: 'End date must be an ISO string',
		}),
		monthly_rent: z.number().nonnegative(),
		deposit: z.number().nonnegative().optional(),
		license: z.string().optional(),
	})
	.refine((val) => parseISO(val.start_date) < parseISO(val.end_date), {
		path: ['start_date'],
		message: 'Start date must be before end date',
	})
	.refine((val) => parseISO(val.start_date) < parseISO(val.end_date), {
		path: ['end_date'],
		message: 'End date must be after end date',
	});

export default {
	title,
	graphqlName,
	validation,
};
