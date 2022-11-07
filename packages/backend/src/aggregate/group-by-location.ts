import { Expense, Unit } from '@prisma/client';
import * as R from 'remeda';
import { GroupByLocationDto } from 'src/aggregate/dto/grouped-by-month.dto';

export const groupByLocation = (
	expenses: (Pick<
		Expense,
		'amount' | 'portfolioId' | 'propertyId' | 'unitId'
	> & { unit: Pick<Unit, 'propertyId'> | null })[],
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

	const array: Pick<
		GroupByLocationDto,
		'amount' | 'portfolioId' | 'propertyId' | 'unitId'
	>[] = [];

	R.forEachObj.indexed(summed, (amount, locationId) => {
		array.push({
			amount,
			portfolioId: grouped[locationId][0].portfolioId,

			// Try to get the propertyId from the unit first, then from the expense
			propertyId:
				grouped[locationId][0].unit?.propertyId ??
				grouped[locationId][0].propertyId,

			unitId: grouped[locationId][0].unitId ?? null,
		});
	});

	return array;
};
