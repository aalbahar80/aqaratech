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
		const group = grouped[locationId]?.[0];

		if (!group) {
			throw new Error('Group not found'); // Should never happen
		}

		array.push({
			amount,
			portfolioId: group.portfolioId,

			// Try to get the propertyId from the unit first, then from the expense
			propertyId: group.unit?.propertyId ?? group.propertyId,

			unitId: group.unitId ?? null,
		});
	});

	return array;
};
