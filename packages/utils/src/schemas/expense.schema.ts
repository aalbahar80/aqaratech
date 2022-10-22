import { z } from 'zod';
import { isID } from './utils/id.schema';
import { zodIsDateOnlyRequired } from './utils/zod-validators';
import { trim } from './utils/zodTransformers';

export const expenseCreateSchema = z
	.object({
		portfolioId: isID,
		propertyId: isID.nullable(),
		unitId: isID.nullable(),
		amount: z.number().gt(0),
		categoryId: z.string().transform(trim).nullish(),
		postAt: zodIsDateOnlyRequired(),
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
