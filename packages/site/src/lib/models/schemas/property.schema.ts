import { zodnanoid } from '$lib/models/schemas/nano-id.schema';
import { falsyToNull, trim } from '$lib/zodTransformers.js';
import { z } from 'zod';

export const updateSchema = z.object({
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
});

export const createSchema = updateSchema.extend({
	portfolioId: zodnanoid,
});
