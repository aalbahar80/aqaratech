import type { InferMutationInput } from '$lib/client/trpc';
import { falsyToNull } from '$lib/zodTransformers';
import { addMonths, format } from 'date-fns';
import { z } from 'zod';
import type { EntityDefinition } from '.';

export function generateSchedule(count: number, amount: number, start: Date) {
	console.log('generating new schedule');
	const newSchedule = [];
	// get the date of the 1st day of the next month
	// const leaseStart = new Date(lease.start);
	const nextMonth = new Date(start.getFullYear(), start.getMonth() + 1, 2);
	console.log('nextMonth: ', nextMonth);

	for (let bp = 0; bp < Math.min(count, 24); bp++) {
		// TODO change to 1 month
		const dueDate = addMonths(nextMonth, bp);
		const memo = `Rent for: ${format(dueDate, 'MMMM yyyy')}`;
		newSchedule.push({
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
		cycleCount: z.number().min(0).max(24),
		billingDay: z.number().min(1).max(31),
		// TODO set between start and end
		firstPayment: z
			.preprocess((arg) => {
				if (typeof arg === 'string' || arg instanceof Date)
					return new Date(arg);
			}, z.date())
			.or(z.literal(''))
			.nullish()
			.transform(falsyToNull),
		schedule: z.array(
			z.object({
				amount: z.number().min(1),
				postDate: z.preprocess((arg) => {
					if (typeof arg === 'string' || arg instanceof Date)
						return new Date(arg);
				}, z.date()),
			}),
		),
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
const defaultForm = (): Lease => ({
	start: new Date(),
	end: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
	deposit: 0,
	monthlyRent: 0,
	tenantId: '',
	unitId: '',
	contactMethod: 'sms',
	shouldNotify: true,
	active: true,
	cycleCount: 12,
	billingDay: 1,
	// TODO fix timezone
	firstPayment: new Date(
		new Date().getFullYear(),
		new Date().getMonth() + 1,
		2,
	),
	schedule: generateSchedule(12, 0, new Date()),
});

const label: typeof definition['label'] = (item) =>
	`${item.start.toLocaleDateString()} - ${item.end.toLocaleDateString()}`;

const definition: EntityDefinition<'leases'> = {
	schema,
	defaultForm,
	label,
};

export default definition;
