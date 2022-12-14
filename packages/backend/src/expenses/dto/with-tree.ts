import { Expense } from '@prisma/client';
import { z } from 'zod';

import { expenseCategorySchema, expenseCategoryTreeSchema } from '@self/utils';

export const populateExpenseType = (
	expense: Expense,
	tree: z.infer<typeof expenseCategoryTreeSchema>,
) => {
	const rawCategory = tree.find((c) => c.id === expense.categoryId);

	if (rawCategory) {
		const expenseType = expenseCategorySchema.parse(rawCategory);
		return { ...expense, expenseType };
	}

	return expense;
};
