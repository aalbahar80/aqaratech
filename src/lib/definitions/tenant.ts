import type { InferMutationInput } from '$lib/client/trpc';
import { falsyToNull, trim } from '$lib/zodTransformers';
import { z } from 'zod';

export const schema = z.object({
	id: z.string().optional(),
	firstName: z.string().min(1, { message: 'Required' }).transform(trim),
	lastName: z.string().min(1, { message: 'Required' }).transform(trim),
	email: z.string().email().or(z.literal('')).transform(falsyToNull),
	phone: z
		.string()
		.min(8)
		.and(z.string().max(8))
		.refine((val) => val.length === 0 || val.match(/^[0-9]+$/) !== null, {
			message: 'Phone must contain only numbers',
		}),
	dob: z
		.preprocess((arg) => {
			if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
		}, z.date())
		.or(z.literal(''))
		.transform(falsyToNull),
	civilid: z
		.string()
		.min(12)
		.and(z.string().max(12))
		.or(z.literal(''))
		.refine((val) => val.length === 0 || val.match(/^[0-9]+$/) !== null, {
			message: 'Civil ID must contain only numbers',
		})
		.transform(falsyToNull),
});

type Tenant = InferMutationInput<'tenants:save'>;
const defaultForm = (): Tenant => ({
	firstName: '',
	lastName: '',
	dob: '',
	email: '',
	civilid: '',
	phone: '',
});

export default { schema, defaultForm };
