import { z } from 'zod';
import type { LeaseData } from './select';

export const saveInput = z.object({
	id: z.undefined(),
	createdAt: z.undefined(),
	updatedAt: z.undefined(),
	monthlyRent: z.number().nonnegative(),
	deposit: z.number().nonnegative().optional(),
	// z.preprocess allows the use of both Date objects and strings
	startDate: z.preprocess((arg) => {
		if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
	}, z.date()),
	endDate: z.preprocess((arg) => {
		if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
	}, z.date()),
});

// Manually overriding date fields since prisma client wrongly
// types them as dates
export const defaultForm: Omit<LeaseData, 'id' | 'createdAt' | 'updatedAt'> = {
	startDate: new Date(),
	endDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
	deposit: 0,
	monthlyRent: 0,
};

const transformer = (data: LeaseData): LeaseData => ({
	...data,
	startDate: data.startDate ? new Date(data.startDate) : null,
	endDate: data.endDate ? new Date(data.endDate) : null,
});

export const formSchema = z.object({
	id: z.undefined(),
	createdAt: z.undefined(),
	updatedAt: z.undefined(),
	monthlyRent: z.number().nonnegative(),
	deposit: z.number().nonnegative().optional(),
	// z.preprocess allows the use of both Date objects and strings
	startDate: z.preprocess((arg) => {
		if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
	}, z.date()),
	endDate: z.preprocess((arg) => {
		if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
	}, z.date()),
});

function refiner(leaseSchema: typeof formSchema) {
	return leaseSchema
		.refine((val) => val.startDate < val.endDate, {
			path: ['startDate'],
			message: 'Start date must be before end date',
		})
		.refine((val) => val.startDate < val.endDate, {
			path: ['endDate'],
			message: 'End date must be after start date',
		});
}

export default { formSchema, defaultForm, transformer, refiner };
