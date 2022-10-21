import { z } from 'zod';
import { isID } from './utils/id.schema';
import { trim } from './utils/zodTransformers';

export const propertyCreateSchema = z
	.object({
		portfolioId: isID,
		label: z.string().transform(trim).nullish(),
		area: z.string().min(1, { message: 'Required' }).transform(trim),
		block: z
			.string()
			.min(1, { message: 'Required' })
			.transform(trim)
			.refine((val) => val.match(/^[0-9]+$/) !== null, {
				message: 'Block must contain only numbers',
			}),
		street: z.string().min(1, { message: 'Required' }).transform(trim),
		avenue: z.string().transform(trim).nullish(),
		parcel: z.string().transform(trim).nullish(),
		paci: z.string().transform(trim).nullish(),
		number: z.string().min(1, { message: 'Required' }).transform(trim),
	})
	.strict();

export const propertyUpdateSchema = propertyCreateSchema
	.omit({
		portfolioId: true,
	})
	.partial();
