import { z } from 'zod';
import { isID } from './utils/id.schema';
import { falsyToNull, trim } from './utils/zodTransformers';

export const propertyUpdateSchema = z.object({
	label: z.string().nullable().transform(trim).transform(falsyToNull),
	area: z
		.string()
		.min(1, { message: 'Required' })
		.transform(trim)
		.transform(falsyToNull),
	block: z
		.string()
		.min(1, { message: 'Required' })
		.refine((val) => val.match(/^[0-9]+$/) !== null, {
			message: 'Block must contain only numbers',
		})
		.transform(trim)
		.transform(falsyToNull),
	street: z
		.string()
		.min(1, { message: 'Required' })
		.transform(trim)
		.transform(falsyToNull),
	avenue: z.string().nullable().transform(trim).transform(falsyToNull),
	parcel: z.string().nullable().transform(trim).transform(falsyToNull),
	paci: z.string().nullable().transform(trim).transform(falsyToNull),
	number: z
		.string()
		.min(1, { message: 'Required' })
		.transform(trim)
		.transform(falsyToNull),
	organizationId: isID,
});

export const propertyCreateSchema = propertyUpdateSchema.extend({
	portfolioId: isID,
});
