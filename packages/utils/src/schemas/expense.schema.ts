import { z } from 'zod';
import { zodDateOnly } from './utils/date/zod-date-only';
import { isID } from './utils/id.schema';
import { trim } from './utils/zod-transformers';

export const expenseCreateSchema = z
	.object({
		portfolioId: isID,
		propertyId: isID.nullish(),
		unitId: isID.nullish(),
		amount: z.number().gt(0),
		categoryId: z.string().transform(trim).nullish(),
		postAt: zodDateOnly(),
		label: z.string().transform(trim).nullish(),
		memo: z.string().transform(trim).nullish(),
	})
	.strict();

export const expenseUpdateSchema = expenseCreateSchema
	.omit({
		portfolioId: true,
		propertyId: true,
		unitId: true,
	})
	.partial();
