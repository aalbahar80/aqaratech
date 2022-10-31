export const aggregateTypes = ['incomeAggregate', 'expensesAggregate'] as const;

/**
 * If the aggregate type is incomeAggregate, returns an array of
 * `[body.total, body.paid, body.unpaid]`
 *
 * Else, return an array of `[body]`
 */
export function aggregateBodyToArray(body: unknown, agg: string) {
	let data: unknown[];
	if (agg === 'incomeAggregate') {
		// @ts-expect-error test
		data = [body.total, body.paid, body.unpaid];
	} else {
		data = [body];
	}
	return data;
}
