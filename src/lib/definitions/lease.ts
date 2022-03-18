import { addMonths, format } from 'date-fns';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import type { EntityDefinition } from '.';

export function generateSchedule({
	count,
	amount,
	scheduleStart,
}: {
	count: number;
	amount: number;
	scheduleStart: Date;
}) {
	console.warn('generating new schedule');
	const newSchedule = [];
	// get the date of the 1st day of the next month
	// const leaseStart = new Date(lease.scheduleStart);
	const nextMonth = new Date(
		scheduleStart.getFullYear(),
		scheduleStart.getMonth() + 1,
		2,
	);

	for (let bp = 0; bp < Math.min(count, 24); bp++) {
		// TODO change to 1 month
		const dueDate = addMonths(nextMonth, bp);
		const memo = `Rent for: ${format(dueDate, 'MMMM yyyy')}`;
		newSchedule.push({
			nanoid: nanoid(),
			amount,
			// postDate: dueDate.toISOString().split('T')[0],
			postDate: dueDate,
			memo,
		});
	}
	return newSchedule;
}

export const schema = z.object({
	id: z.string().uuid().optional(),
	monthlyRent: z.number().min(1),
	start: z.preprocess((arg) => {
		if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
	}, z.date()),
	end: z.preprocess((arg) => {
		if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
	}, z.date()),
	tenantId: z.string().uuid(),
	unitId: z.string().uuid(),
	shouldNotify: z.boolean(),
	active: z.boolean(),
});

export const refinedSchema = schema
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
		postDate: z.preprocess((arg) => {
			if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
		}, z.date()),
		nanoid: z.string(),
		memo: z.string(),
	}),
);

export const leaseFormSchema = schema
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
			if (item.postDate > val.end) {
				ctx.addIssue({
					code: z.ZodIssueCode.invalid_date,
					path: ['schedule', idx, 'postDate'],
					message: 'Post date must be before end date',
				});
			} else if (item.postDate < val.start) {
				ctx.addIssue({
					code: z.ZodIssueCode.invalid_date,
					path: ['schedule', idx, 'postDate'],
					message: 'Post date must be after start date',
				});
			}
		});
	});

export const defaultForm = (): z.infer<typeof leaseFormSchema> => ({
	start: new Date(),
	end: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
	monthlyRent: 0,
	tenantId: '',
	unitId: '',
	shouldNotify: true,
	active: true,
	schedule: generateSchedule({
		count: 12,
		amount: 0,
		scheduleStart: new Date(),
	}),
});

const label: typeof definition['label'] = (item) =>
	`${item.start.toLocaleDateString()} - ${item.end.toLocaleDateString()}`;

const definition: EntityDefinition<'leases'> = {
	schema,
	defaultForm,
	label,
};

export default definition;
