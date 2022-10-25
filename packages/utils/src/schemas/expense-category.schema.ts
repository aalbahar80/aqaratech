import { z } from 'zod';
import { isID } from './utils/id.schema';
import { zodString, zodStringOptional } from './utils/zod-string';

export const expenseCategorySchema = z
	.object({
		id: isID,
		labelEn: zodString,
		labelAr: zodStringOptional,
		description: zodStringOptional,
		parentId: zodStringOptional,
		isGroup: z.boolean(),
	})
	.strict();

export const expenseCategoryCreateSchema = expenseCategorySchema.omit({
	id: true,
});

export const expenseCategoryUpdateSchema = expenseCategorySchema.omit({
	id: true,
	isGroup: true,
});

export const expenseCategoryTreeSchema = z.array(
	expenseCategorySchema.omit({ isGroup: true }),
);
