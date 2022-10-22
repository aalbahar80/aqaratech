import { z } from 'zod';
import { isID } from './utils/id.schema';
import { stringToNumber } from './utils/string-to-number';
import { trim } from './utils/zodTransformers';

export const unitCreateSchema = z
	.object({
		portfolioId: isID,
		propertyId: isID,
		label: z.string().transform(trim).nullish(),
		unitNumber: z
			.string()
			.refine((val) => val.trim().length > 0, { message: 'Required' })
			.transform(trim),
		bed: z.union([stringToNumber, z.number()]).nullish(),
		bath: z.union([stringToNumber, z.number()]).nullish(),
		size: z.union([stringToNumber, z.number()]).nullish(),
		floor: z.union([stringToNumber, z.number()]).nullish(),
		marketRent: z.union([stringToNumber, z.number()]).nullish(),
		usage: z.string().transform(trim).nullish(),
		type: z.string().transform(trim).nullish(),
	})
	.strict();

export const unitUpdateSchema = unitCreateSchema
	.omit({
		portfolioId: true,
		propertyId: true,
	})
	.partial();
