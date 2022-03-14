import type { InferMutationInput } from '$lib/client/trpc';
import { falsyToNull } from '$lib/zodTransformers';
import { z } from 'zod';
import type { EntityDefinition } from '.';

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
		transactions: z.array(z.object({ amount: z.number().min(1) })),
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
	transactions: [],
});

const label: typeof definition['label'] = (item) =>
	`${item.start.toLocaleDateString()} - ${item.end.toLocaleDateString()}`;

const definition: EntityDefinition<'leases'> = {
	schema,
	defaultForm,
	label,
};

export default definition;
