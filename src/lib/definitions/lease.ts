import type { InferMutationInput } from '$lib/client/trpc';
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
	console.log('generating new schedule');
	console.log({
		count,
		amount,
		scheduleStart,
	});
	const newSchedule = [];
	// get the date of the 1st day of the next month
	// const leaseStart = new Date(lease.scheduleStart);
	const nextMonth = new Date(
		scheduleStart.getFullYear(),
		scheduleStart.getMonth() + 1,
		2,
	);
	console.log('nextMonth: ', nextMonth);

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
	console.log({ newSchedule }, 'LeaseForm.svelte ~ 114');
	return newSchedule;
}

export const schema = z
	.object({
		id: z.string().uuid().optional(),
		monthlyRent: z.number().nonnegative(),
		deposit: z.number().nonnegative(),
		start: z.preprocess((arg) => {
			if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
		}, z.date()),
		end: z.preprocess((arg) => {
			if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
		}, z.date()),
		tenantId: z.string().uuid(),
		unitId: z.string().uuid(),
		contactMethod: z.enum(['sms', 'email']).nullish(),
		shouldNotify: z.boolean(),
		active: z.boolean(),
	})
	.refine((val) => val.start < val.end, {
		path: ['start'],
		message: 'Start date must be before end date',
	})
	.refine((val) => val.start < val.end, {
		path: ['end'],
		message: 'End date must be after start date',
	});

type Lease = InferMutationInput<'leases:save'>;
export const defaultForm = (): Lease => ({
	start: new Date(),
	end: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
	deposit: 0,
	monthlyRent: 0,
	tenantId: '',
	unitId: '',
	contactMethod: 'sms',
	shouldNotify: true,
	active: true,
});

const label: typeof definition['label'] = (item) =>
	`${item.start.toLocaleDateString()} - ${item.end.toLocaleDateString()}`;

const definition: EntityDefinition<'leases'> = {
	schema,
	defaultForm,
	label,
};

export default definition;
