import { zodCheckbox } from 'src/schemas/utils/zod-checkbox';
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
		isGroup: zodCheckbox,
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

// Export types
export type ExpenseCategory = z.infer<typeof expenseCategorySchema>;

export type ExpenseCategoryCreateSchema = z.infer<
	typeof expenseCategoryCreateSchema
>;

export type ExpenseCategoryUpdateSchema = z.infer<
	typeof expenseCategoryUpdateSchema
>;

export type ExpenseCategoryTreeSchema = z.infer<
	typeof expenseCategoryTreeSchema
>;
