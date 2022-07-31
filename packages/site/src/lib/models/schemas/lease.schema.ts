import { zodnanoid } from '$lib/models/schemas/nano-id.schema';
import { zodIsDateRequired } from '$lib/utils/zod-validators';
import { z, ZodSchema } from 'zod';

export const base = z.object({
	monthlyRent: z.number().min(1),
	start: zodIsDateRequired(),
	end: zodIsDateRequired(),
	notify: z.boolean(),
	canPay: z.boolean(),
});

export const createBase = base.extend({
	tenantId: zodnanoid,
	unitId: zodnanoid,
});

export const refined = (s: ZodSchema) =>
	s
		.refine(
			(val) => val.start && val.end && new Date(val.start) < new Date(val.end),
			{
				path: ['start'],
				message: 'Start date must be before end date',
			},
		)
		.refine(
			(val) => val.start && val.end && new Date(val.start) < new Date(val.end),
			{
				path: ['end'],
				message: 'End date must be after start date',
			},
		);

export const updateSchema = refined(base);
export const createSchema = refined(createBase);
