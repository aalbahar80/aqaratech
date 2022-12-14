import { Expense, Prisma } from '@prisma/client';
import { z } from 'zod';

import { expenseCategorySchema } from '@self/utils';

export const populateExpenseType = (
	expense: Expense,
	rawTree: Prisma.JsonValue,
) => {
	// avoid expenseCategoryTreeSchema because it doesn't allow the isGroup key.
	const tree = z.array(expenseCategorySchema).parse(rawTree);

	const rawCategory = tree.find((c) => c.id === expense.categoryId);

	if (rawCategory) {
		const expenseType = expenseCategorySchema.parse(rawCategory);
		return { ...expense, expenseType };
	}

	return expense;
};
