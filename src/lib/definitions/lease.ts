import type { InferMutationInput } from '$lib/client/trpc';
import { z } from 'zod';

export const schema = z.object({
	id: z.string().nullable(),
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

type Lease = InferMutationInput<'leases:save'>;
const defaultForm = (): Lease => ({
	id: '',
	startDate: new Date(),
	endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
	deposit: 0,
	monthlyRent: 0,
});

// const transformer = (data) => ({
// 	...data,
// 	startDate: data.startDate ? new Date(data.startDate) : null,
// 	endDate: data.endDate ? new Date(data.endDate) : null,
// });

// function refiner(leaseSchema) {
// 	return leaseSchema
// 		.refine((val) => val.startDate < val.endDate, {
// 			path: ['startDate'],
// 			message: 'Start date must be before end date',
// 		})
// 		.refine((val) => val.startDate < val.endDate, {
// 			path: ['endDate'],
// 			message: 'End date must be after start date',
// 		});
// }

export default { schema, defaultForm };
