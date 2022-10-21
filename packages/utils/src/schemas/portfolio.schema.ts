import { z } from 'zod';
import { civilidSchema } from './utils/civilid.schema';
import { phoneSchema } from './utils/phone.schema';
import { zodIsDateOnlyOptional } from './utils/zod-validators';
import { trim } from './utils/zodTransformers';

export const portfolioCreateSchema = z
	.object({
		fullName: z.string().min(1, { message: 'Required' }).transform(trim),
		label: z.string().nullish().transform(trim),
		phone: phoneSchema,
		civilid: civilidSchema,
		dob: zodIsDateOnlyOptional(),
	})
	.strict();

export const portfolioUpdateSchema = portfolioCreateSchema.partial();
