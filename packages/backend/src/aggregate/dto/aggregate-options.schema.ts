import { endOfMonthN, startOfMonthN, zodDateOnly } from '@self/utils';
import { z } from 'zod';

export const aggregateOptionsSchema = z
	.object({
		start: zodDateOnly.default(() => startOfMonthN(1).slice(0, 10)),
		end: zodDateOnly.default(() => endOfMonthN(0).slice(0, 10)),
		propertyId: z.string().uuid().optional(),
		unitId: z.string().uuid().optional(),
	})
	.strict();

/**
 * Treats literal `null` as null.
 */
const zodNullishQueryParam = z.preprocess((arg) => {
	if (typeof arg == 'string' && arg === 'null') {
		return null;
	} else {
		return arg;
	}
}, z.string().uuid().nullish());

export const aggregateOptionsExpensesSchema = z
	.object({
		start: zodDateOnly.default(() => startOfMonthN(1).slice(0, 10)),
		end: zodDateOnly.default(() => endOfMonthN(0).slice(0, 10)),
		propertyId: zodNullishQueryParam,
		unitId: zodNullishQueryParam,
	})
	.strict();
