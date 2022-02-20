import type { InferMutationInput } from '$lib/client/trpc';
import { falsyToNull, trim } from '$lib/zodTransformers';
import { z } from 'zod';

export const saveInput = z.object({
	// TODO replace z.undefined with z.never?
	// TODO what happens if i pass in manual createdAt and updatedAt?
	id: z.string().nullable(),
	firstName: z.string().min(1, { message: 'Required' }).transform(trim),
	lastName: z.string().min(1, { message: 'Required' }).transform(trim),
	email: z.string().email().optional().transform(falsyToNull),
	phone: z.string().min(8).and(z.string().max(8)),
	dob: z.preprocess((arg) => {
		if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
	}, z.date().nullable()),
	civilid: z
		.string()
		.min(12)
		.and(z.string().max(12))
		.or(z.literal(''))
		.refine((val) => val.length === 0 || val.match(/^[0-9]+$/) !== null, {
			message: 'Civil ID must contain only numbers',
		})
		.nullable(),
});

type Tenant = InferMutationInput<'tenants:save'>;
const defaultForm = (): Tenant => ({
	id: '',
	firstName: 'Kylian',
	lastName: 'Mbapdsfpe',
	dob: new Date(),
	email: '',
	civilid: '',
	phone: '12345678',
});

export default { defaultForm };
