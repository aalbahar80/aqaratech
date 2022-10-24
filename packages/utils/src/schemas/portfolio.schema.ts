import { z } from 'zod';
import { civilidSchema } from './utils/civilid.schema';
import { zodDateOnlyOptional } from './utils/date/zod-date-only';
import { phoneSchemaOptional } from './utils/phone.schema';
import { zodString, zodStringOptional } from './utils/zod-string';

export const portfolioCreateSchema = z
	.object({
		fullName: zodString,
		label: zodStringOptional,
		phone: phoneSchemaOptional,
		civilid: civilidSchema,
		dob: zodDateOnlyOptional,
	})
	.strict();

export const portfolioUpdateSchema = portfolioCreateSchema.partial();
