import { z } from 'zod';
import { parseISO } from 'date-fns';

const leases = z
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

const clients = z.object({
	first_name: z.string().min(1, { message: 'Required' }),
	last_name: z.string().min(1, { message: 'Required' }),
	email: z.string().email(),
	phone: z.string().min(8).and(z.string().max(8)).or(z.literal('')),
});

const properties = z.object({
	area: z.string().min(1, { message: 'Required' }),
	block: z.string().min(1, { message: 'Required' }),
	street: z.string().min(1, { message: 'Required' }),
	number: z.string().min(1, { message: 'Required' }),
});

export const v = {
	fallback: z.object({}),
	leases,
	clients,
	properties,
	tenants,
};
