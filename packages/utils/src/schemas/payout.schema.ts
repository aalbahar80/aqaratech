import { z } from 'zod';

import { zodNumber } from 'src/schemas/utils/zod-number';

import { zodDateOnly } from './utils/date/zod-date-only';
import { isID } from './utils/id.schema';
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
