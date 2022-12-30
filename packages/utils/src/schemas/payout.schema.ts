import { z } from 'zod';

import { zodDateOnly } from './utils/date/zod-date-only';
import { isID } from './utils/id.schema';
import { zodNumber } from './utils/zod-number';
import { zodStringOptional } from './utils/zod-string';

export const payoutCreateSchema = z
	.object({
		portfolioId: isID,
		amount: zodNumber,
		postAt: zodDateOnly,
		memo: zodStringOptional,
	})
	.strict();

// Export types

export type PayoutCreateSchema = z.infer<typeof payoutCreateSchema>;
