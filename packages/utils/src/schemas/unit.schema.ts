import { z } from 'zod';
import { isID } from './utils/id.schema';
import { stringToNumber } from './utils/string-to-number';
import { zodString, zodStringOptional } from './utils/zod-string';

export const unitCreateSchema = z
	.object({
		portfolioId: isID,
		propertyId: isID,
		label: zodStringOptional,
		unitNumber: zodString,
		bed: z.union([stringToNumber, z.number()]).nullish(),
		bath: z.union([stringToNumber, z.number()]).nullish(),
		size: z.union([stringToNumber, z.number()]).nullish(),
		floor: z.union([stringToNumber, z.number()]).nullish(),
		marketRent: z.union([stringToNumber, z.number()]).nullish(),
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
