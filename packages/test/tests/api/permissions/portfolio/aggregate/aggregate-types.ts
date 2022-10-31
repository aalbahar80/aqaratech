export enum AggregateType {
	Income = 'incomeAggregate',
	Expenses = 'expensesAggregate',
}

export const aggregateTypes = [
	AggregateType.Income,
	AggregateType.Expenses,
] as const;

/**
 * If the aggregate type is incomeAggregate, returns an array of
 * `[body.total, body.paid, body.unpaid]`
 *
 * Else, return an array of `[body]`
 */
export function aggregateBodyToArray(body: unknown, agg: AggregateType) {
	let data: unknown[];
	if (agg === AggregateType.Income) {
		// @ts-expect-error test
		data = [body.total, body.paid, body.unpaid];
	} else {
		data = [body];
	}
	return data;
}
