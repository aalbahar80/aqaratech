import type { GroupByMonthDto } from '$api/openapi';

export const calculateNet = (
	income: GroupByMonthDto[],
	expenses: GroupByMonthDto[],
): GroupByMonthDto[] => {
	if (income.length !== expenses.length) {
		throw new Error('Income and expenses must have the same length');
	}

	const net = income.map((i) => {
		const e = expenses.find((e) => e.date === i.date);
		return {
			date: i.date,
			amount: i.amount - (e?.amount ?? 0),
		};
	});

	return net;
};
