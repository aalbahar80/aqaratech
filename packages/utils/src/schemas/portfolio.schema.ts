import { z } from 'zod';
import { civilidSchema } from './utils/civilid.schema';
import { zodDateOnlyOptional } from './utils/date/zod-date-only';
import { phoneSchema } from './utils/phone.schema';
import { trim } from './utils/zod-transformers';

export const portfolioCreateSchema = z
	.object({
		fullName: z.string().min(1, { message: 'Required' }).transform(trim),
		label: z.string().nullish().transform(trim),
		phone: phoneSchema,
		civilid: civilidSchema,
		dob: zodDateOnlyOptional(),
	})
	.strict();

export const portfolioUpdateSchema = portfolioCreateSchema.partial();
