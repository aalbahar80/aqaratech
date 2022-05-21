import { strToDate } from '$lib/zodTransformers.js';
import { z } from 'zod';

const baseSchema = z.object({
	id: z.string().uuid().optional(),
	monthlyRent: z.number().min(1),
	start: z.preprocess(strToDate, z.date()),
	end: z.preprocess(strToDate, z.date()),
	tenantId: z.string().uuid(),
	unitId: z.string().uuid(),
	notify: z.boolean(),
	deactivated: z.boolean(),
});

export const schema = baseSchema
	.refine((val) => val.start < val.end, {
		path: ['start'],
		message: 'Start date must be before end date',
	})
	.refine((val) => val.start < val.end, {
		path: ['end'],
		message: 'End date must be after start date',
	});

const scheduleSchema = z.array(
	// should schedule be array or object?
	// TODO import schema from ./transaction
	z.object({
		amount: z.number().min(1),
		postAt: z.preprocess(strToDate, z.date()),
		nanoid: z.string(),
		memo: z.string(),
	}),
);

export const leaseFormSchema = baseSchema
	.extend({
		schedule: scheduleSchema,
	})
	.refine((val) => val.start < val.end, {
		path: ['start'],
		message: 'Start date must be before end date',
	})
	.refine((val) => val.start < val.end, {
		path: ['end'],
		message: 'End date must be after start date',
	})
	.superRefine((val, ctx) => {
		val.schedule.map((item, idx) => {
			if (item.postAt > val.end) {
				ctx.addIssue({
					code: z.ZodIssueCode.invalid_date,
					path: ['schedule', idx, 'postAt'],
					message: 'Post date must be before end date',
				});
			} else if (item.postAt < val.start) {
				ctx.addIssue({
					code: z.ZodIssueCode.invalid_date,
					path: ['schedule', idx, 'postAt'],
					message: 'Post date must be after start date',
				});
			}
		});
	});
