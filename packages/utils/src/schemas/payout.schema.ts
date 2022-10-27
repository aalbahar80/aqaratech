import { z } from 'zod';
import { zodDateOnly } from './utils/date/zod-date-only';
import { isID } from './utils/id.schema';
import { zodStringOptional } from './utils/zod-string';

export const payoutCreateSchema = z
	.object({
		portfolioId: isID,
		amount: z.number().gt(0),
		postAt: zodDateOnly,
		memo: zodStringOptional,
	})
	.strict();
