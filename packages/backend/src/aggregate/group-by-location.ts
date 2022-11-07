import { Expense } from '@prisma/client';
import * as R from 'remeda';
import { GroupByLocationDto } from 'src/aggregate/dto/grouped-by-month.dto';

export const groupByLocation = (
	expenses: Pick<Expense, 'amount' | 'portfolioId' | 'propertyId' | 'unitId'>[],
) => {
	// Group by location (priority: unit, property, portfolio)
	const grouped = R.groupBy(
		expenses,
		(expense) => expense.unitId ?? expense.propertyId ?? expense.portfolioId,
	);

	// Sum up the amounts
	const summed = R.mapValues(grouped, (expenses) =>
		R.sumBy(expenses, (expense) => expense.amount),
	);

	const array: GroupByLocationDto[] = [];

	R.forEachObj.indexed(summed, (amount, locationId) => {
		array.push({
			amount,
			portfolioId: grouped[locationId][0].portfolioId,
			propertyId: grouped[locationId][0].propertyId ?? null,
			unitId: grouped[locationId][0].unitId ?? null,
		});
	});

	return array;
};
