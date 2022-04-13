import trpc from '$lib/client/trpc';
import { strToDate } from '$lib/zodTransformers';
import type { IEntity } from '$models/interfaces/entity.interface';
import { addMonths, format } from 'date-fns';
import { nanoid } from 'nanoid';
import { z } from 'zod';

const schema = z.object({
	id: z.string().uuid().optional(),
	monthlyRent: z.number().min(1),
	start: z.preprocess(strToDate, z.date()),
	end: z.preprocess(strToDate, z.date()),
	tenantId: z.string().uuid(),
	unitId: z.string().uuid(),
	shouldNotify: z.boolean(),
	active: z.boolean(),
});

const scheduleSchema = z.array(
	// should schedule be array or object?
	// TODO import schema from ./transaction
	z.object({
		amount: z.number().min(1),
		postDate: z.preprocess(strToDate, z.date()),
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

	// Check out date-fns eachMonthOfInterval
	// https://date-fns.org/v2.28.0/docs/eachMonthOfInterval
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

const getOptions = async () => {
	const result = await trpc.query('leases:search', {});
	const options = result.map((item) => ({
		value: item.id,
		label: item.id,
	}));
	return options;
};

const LeaseModelBase: IEntity<'leases'> = {
	name: 'leases',
	singular: 'lease',
	plural: 'leases',
	defaultForm: () => ({
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
	}),
};

interface ILabel {
	start: Date;
	end: Date;
}

export const LeaseModel = {
	...LeaseModelBase,
	schema,
	leaseFormSchema,
	getLabel: (item: ILabel) =>
		`${item.start.toLocaleDateString()} - ${item.end.toLocaleDateString()}`,
	getOptions,
	basicFields: [
		'id',
		'monthlyRent',
		'start',
		'end',
		'shouldNotify',
		'active',
	] as const,
	relationalFields: ['tenantId', 'unitId'] as const,
};

export const getBadge = (dates: { start: Date; end: Date }) => {
	if (dates.end < new Date()) {
		return {
			label: 'Expired',
			color: 'red',
		};
	}
	if (dates.start > new Date()) {
		return {
			label: 'Upcoming',
			color: 'indigo',
		};
	}
	return {
		label: 'Current',
		color: 'green',
	};
};

interface PredefinedTenant {
	initiator: 'tenant';
	tenantId: string;
	firstName: string;
	lastName: string;
}
interface PredefinedUnit {
	initiator: 'unit';
	unitId: string;
	unitNumber: string;
	propertyId: string;
	address: string;
}

interface PredefinedLease {
	initiator: 'lease';
	tenantId: string;
	firstName: string;
	lastName: string;
	unitId: string;
	unitNumber: string;
	propertyId: string;
	address: string;
	monthlyRent: number;
}
// helper type for new lease form
export type Predefined = PredefinedTenant | PredefinedUnit | PredefinedLease;
