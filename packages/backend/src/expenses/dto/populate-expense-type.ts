import { Expense, Prisma } from '@prisma/client';

import { expenseCategorySchema, expenseCategoryTreeSchema } from '@self/utils';

export const populateExpenseType = (
	expense: Expense,
	rawTree: Prisma.JsonValue,
) => {
	const tree = expenseCategoryTreeSchema.parse(rawTree);

	const rawCategory = tree.find((c) => c.id === expense.categoryId);

	if (rawCategory) {
		const expenseType = expenseCategorySchema.parse(rawCategory);
		return { ...expense, expenseType };
	}

	return expense;
};
