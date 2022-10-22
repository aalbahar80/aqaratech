import { z } from 'zod';
import { isID } from './utils/id.schema';
import { zodIsDateString } from './utils/zod-date-string';
import { trim } from './utils/zodTransformers';

export const expenseCreateSchema = z
	.object({
		portfolioId: isID,
		propertyId: isID.nullish(),
		unitId: isID.nullish(),
		amount: z.number().gt(0),
		categoryId: z.string().transform(trim).nullish(),
		postAt: zodIsDateString(),
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
