import { Expense } from '@prisma/client';
import * as R from 'remeda';

import { GroupByCategoryDto } from 'src/aggregate/dto/grouped-by-month.dto';

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

	const array: GroupByCategoryDto[] = [];

	R.forEachObj.indexed(summed, (amount, categoryId) => {
		array.push({ categoryId: categoryId as string, amount });
	});

	return array;
};
