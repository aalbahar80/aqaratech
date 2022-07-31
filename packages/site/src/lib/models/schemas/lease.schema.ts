import { zodnanoid } from '$lib/models/schemas/nano-id.schema';
import { zodIsDateRequired } from '$lib/utils/zod-validators';
import { strToDate } from '$lib/zodTransformers.js';
import { z } from 'zod';

export const updateSchema = z.object({
	monthlyRent: z.number().min(1),
	start: zodIsDateRequired(),
	end: zodIsDateRequired(),
	notify: z.boolean(),
	canPay: z.boolean(),
});

export const createSchema = updateSchema
	.extend({
		tenantId: zodnanoid,
		unitId: zodnanoid,
	})
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

export const scheduleSchema = z.array(
	z.object({
		amount: z.number().min(1),
		postAt: z.preprocess(strToDate, z.date()),
		nanoid: z.string(),
		memo: z.string(),
	}),
);

// export const leaseFormSchema = baseSchema
// 	.extend({
// 		schedule: scheduleSchema,
// 	})
// 	.refine((val) => val.start < val.end, {
// 		path: ['start'],
// 		message: 'Start date must be before end date',
// 	})
// 	.refine((val) => val.start < val.end, {
// 		path: ['end'],
// 		message: 'End date must be after start date',
// 	})
// 	.superRefine((val, ctx) => {
// 		val.schedule.map((item, idx) => {
// 			if (item.postAt > val.end) {
// 				ctx.addIssue({
// 					code: z.ZodIssueCode.invalid_date,
// 					path: ['schedule', idx, 'postAt'],
// 					message: 'Post date must be before end date',
// 				});
// 			} else if (item.postAt < val.start) {
// 				ctx.addIssue({
// 					code: z.ZodIssueCode.invalid_date,
// 					path: ['schedule', idx, 'postAt'],
// 					message: 'Post date must be after start date',
// 				});
// 			}
// 		});
// 	});
