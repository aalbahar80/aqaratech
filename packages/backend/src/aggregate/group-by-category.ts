import { Expense } from '@prisma/client';
import * as R from 'remeda';

export const groupByCategory = (
	expenses: Pick<Expense, 'categoryId' | 'amount'>[],
) => {
	// Group by category
	const grouped = R.groupBy(
		expenses,
		(expense) => expense.categoryId ?? 'Uncategorized',
	);

	// Sum up the amounts
	const summed = R.mapValues(grouped, (expenses) =>
		R.sumBy(expenses, (expense) => expense.amount),
	);

	return summed;
};
