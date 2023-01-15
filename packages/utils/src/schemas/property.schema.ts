import { z } from 'zod';

import { isID } from './utils/id.schema';
import { zodString, zodStringOptional } from './utils/zod-string';

export const propertyCreateSchema = z
	.object({
		portfolioId: isID,
		label: zodStringOptional,
		area: zodString,
		block: zodString.refine((val) => /^\d+$/.exec(val) !== null, {
			message: 'Block must contain only numbers',
		}),
		street: zodString,
		avenue: zodStringOptional,
		parcel: zodStringOptional,
		paci: zodStringOptional,
		number: zodString,
	})
	.strict();

export const propertyUpdateSchema = propertyCreateSchema
	.omit({
		portfolioId: true,
	})
	.partial();

// Export types

export type PropertyCreateSchema = z.infer<typeof propertyCreateSchema>;
export type PropertyUpdateSchema = z.infer<typeof propertyUpdateSchema>;
