import { z } from 'zod';
import type { LeaseData } from './select';

// Manually overriding date fields since prisma client wrongly
// types them as dates
export const defaultForm: Omit<LeaseData, 'id' | 'createdAt' | 'updatedAt'> = {
	startDate: new Date(),
	endDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
	deposit: 0,
	monthlyRent: 0,
};

const transformer = (data: any) => ({
	...data,
	startDate: data.startDate ? new Date(data.startDate) : null,
	endDate: data.endDate ? new Date(data.endDate) : null,
});

export const formSchema = z.object({
	id: z.undefined(),
	createdAt: z.undefined(),
	updatedAt: z.undefined(),
	startDate: z.date(),
	endDate: z.date(),
	monthlyRent: z.number().nonnegative(),
	deposit: z.number().nonnegative().optional(),
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
