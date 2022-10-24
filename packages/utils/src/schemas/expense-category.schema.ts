import { z } from 'zod';
import { isID } from './utils/id.schema';
import { zodString, zodStringOptional } from './utils/zod-string';

// TODO: make updateSchema partial()?
export const expenseCategoryUpdateSchema = z
	.object({
		id: isID,
		labelEn: zodString,
		labelAr: zodStringOptional,
		description: zodStringOptional,
		parentId: zodStringOptional,
	})
	.strict();

export const expenseCategoryCreateSchema = expenseCategoryUpdateSchema
	.extend({
		isGroup: z.boolean(),
	})
	.omit({ id: true });
