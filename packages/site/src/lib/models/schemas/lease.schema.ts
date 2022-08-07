import { isID } from '$lib/models/schemas/id.schema';
import { zodIsDateRequired } from '$lib/utils/zod-validators';
import { z } from 'zod';

export const base = z.object({
	monthlyRent: z.number().min(1),
	start: zodIsDateRequired(),
	end: zodIsDateRequired(),
	notify: z.boolean(),
	canPay: z.boolean(),
});

export const createBase = base.extend({
	tenantId: isID,
	unitId: isID,
});

export const refined = (s: typeof createBase) =>
	s
		.refine(
			(val) =>
				val.start && val.end && Date.parse(val.start) < Date.parse(val.end),
			{
				path: ['start'],
				message: 'Start date must be before end date',
			},
		)
		.refine(
			(val) =>
				val.start && val.end && Date.parse(val.start) < Date.parse(val.end),
			{
				path: ['end'],
				message: 'End date must be after start date',
			},
		);

// @ts-ignore
export const updateSchema = refined(base);
export const createSchema = refined(createBase);
