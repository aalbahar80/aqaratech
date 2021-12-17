import { z } from 'zod';
import { parseISO } from 'date-fns';

const leaseValidation = z
	.object({
		// validate that start_date is an iso string
		start_date: z.string().refine((val) => Date.parse(val), {
			message: 'Start date must be an ISO string'
		}),

		end_date: z.string().refine((val) => Date.parse(val), {
			message: 'End date must be an ISO string'
		}),
		monthly_rent: z.number().nonnegative(),
		deposit: z.number().nonnegative().optional(),
		license: z.string().optional()
	})
	.refine((val) => parseISO(val.start_date) < parseISO(val.end_date), {
		path: ['start_date'],
		message: 'Start date must be before end date'
	})
	.refine((val) => parseISO(val.start_date) < parseISO(val.end_date), {
		path: ['end_date'],
		message: 'End date must be after end date'
	});

export const v = {
	leases: leaseValidation
};
