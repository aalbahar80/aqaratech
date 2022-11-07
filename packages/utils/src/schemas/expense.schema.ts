import { z } from 'zod';
import { zodDateOnly } from './utils/date/zod-date-only';
import { isID } from './utils/id.schema';
import { zodStringOptional } from './utils/zod-string';

export const expenseCreateSchema = z
	.object({
		portfolioId: isID,
		propertyId: isID.nullish(),
		unitId: isID.nullish(),
		amount: z.number().gt(0),
		categoryId: zodStringOptional,
		postAt: zodDateOnly,
		label: zodStringOptional,
		memo: zodStringOptional,
	})
	.strict();

export const expenseUpdateSchema = expenseCreateSchema
	.omit({
		portfolioId: true,
		propertyId: true,
		unitId: true,
	})
	.partial();

// Export types

export type ExpenseCreateSchema = z.infer<typeof expenseCreateSchema>;

export type ExpenseUpdateSchema = z.infer<typeof expenseUpdateSchema>;
