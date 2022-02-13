import { z } from 'zod';
import type { TenantData } from './select';

export const defaultForm: Omit<TenantData, 'id' | 'createdAt' | 'updatedAt'> = {
	firstName: null,
	lastName: null,
	phone: null,
	email: null,
	dob: null,
	civilid: null,
};

export const formSchema = z.object({
	id: z.undefined(),
	createdAt: z.undefined(),
	updatedAt: z.undefined(),
	firstName: z.string().min(1, { message: 'Required' }),
	lastName: z.string().min(1, { message: 'Required' }),
	email: z.string().email(),
	phone: z.string().min(8).and(z.string().max(8)),
	civilid: z
		.string()
		.min(12)
		.and(z.string().max(12))
		.or(z.literal(''))
		.refine((val) => val.length === 0 || val.match(/^[0-9]+$/) !== null, {
			message: 'Civil ID must contain only numbers',
		}),
});

export default { formSchema, defaultForm };
