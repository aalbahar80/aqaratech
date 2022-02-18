import { z } from 'zod';
import type { TenantData } from './select';

export const saveInput = z.object({
	// TODO replace z.undefined with z.never?
	// TODO what happens if i pass in manual createdAt and updatedAt?
	id: z.string().optional(),
	firstName: z.string().min(1, { message: 'Required' }),
	lastName: z.string().min(1, { message: 'Required' }),
	email: z.string().email(),
	phone: z.string().min(8).and(z.string().max(8)),
	dob: z.preprocess((arg) => {
		if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
	}, z.date()),
	civilid: z
		.string()
		.min(12)
		.and(z.string().max(12))
		.or(z.literal(''))
		.refine((val) => val.length === 0 || val.match(/^[0-9]+$/) !== null, {
			message: 'Civil ID must contain only numbers',
		}),
});

const transformer = (data: TenantData): TenantData => ({
	...data,
	dob: data.dob ? new Date(data.dob) : null,
});
export const defaultForm = {};
export const formSchema = {};
export default { defaultForm, transformer };
