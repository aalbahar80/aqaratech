import { z } from 'zod';

import { isID } from './utils/id.schema';
import { zodNumberOptional } from './utils/zod-number';
import { zodString, zodStringOptional } from './utils/zod-string';

export const unitCreateSchema = z
	.object({
		portfolioId: isID,
		propertyId: isID,
		label: zodStringOptional,
		unitNumber: zodString,
		bed: zodNumberOptional,
		bath: zodNumberOptional,
		size: zodNumberOptional,
		floor: zodNumberOptional,
		marketRent: zodNumberOptional,
		usage: zodStringOptional,
		type: zodStringOptional,
	})
	.strict();

export const unitUpdateSchema = unitCreateSchema
	.omit({
		portfolioId: true,
		propertyId: true,
	})
	.partial();

// Export types

export type UnitCreateSchema = z.infer<typeof unitCreateSchema>;

export type UnitUpdateSchema = z.infer<typeof unitUpdateSchema>;
