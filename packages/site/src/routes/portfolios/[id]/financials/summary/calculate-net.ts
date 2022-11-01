import type { GroupByMonthDto } from '$api/openapi';

export const calculateNet = (
	income: GroupByMonthDto[],
	expenses: GroupByMonthDto[],
) => {
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

	const withPct = addPctChange(net);

	return withPct;
};

const addPctChange = (data: GroupByMonthDto[]) => {
	const result = data.map((d, i) => {
		const prev = data[i - 1];
		const pctChange = prev ? (d.amount - prev.amount) / prev.amount : 0;
		return {
			...d,
			change: pctChange,
		};
	});

	return result;
};
