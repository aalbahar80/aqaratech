import { z } from 'zod';
import { isID } from './utils/id.schema';
import { zodString, zodStringOptional } from './utils/zod-string';

export const propertyCreateSchema = z
	.object({
		portfolioId: isID,
		label: zodStringOptional,
		area: zodString,
		block: zodString.refine((val) => val.match(/^[0-9]+$/) !== null, {
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
