import { zodnanoid } from '$lib/models/schemas/nano-id.schema';
import type { ZodDto } from '$lib/models/types/zod-dto.type';
import { falsyToNull, trim } from '$lib/zodTransformers.js';
import type { CreatePropertyDto, UpdatePropertyDto } from '@self/sdk';
import { z } from 'zod';

export const updateSchema = z.object({
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
});

export const createSchema = updateSchema.extend({
	portfolioId: zodnanoid,
});

// Attempt to cast the DTO to the schema to keep them in sync
export type UpdateSchema = ZodDto<UpdatePropertyDto, typeof updateSchema>;
export type CreateSchema = ZodDto<CreatePropertyDto, typeof createSchema>;
