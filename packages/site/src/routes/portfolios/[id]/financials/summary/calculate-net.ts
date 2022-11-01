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

	// sort from newest to oldest
	const sorted = withPct.sort((a, b) => b.date.localeCompare(a.date));

	return sorted;
};

const addPctChange = (data: GroupByMonthDto[]) => {
	// sort from oldest to newest
	const sorted = data.sort((a, b) => a.date.localeCompare(b.date));

	const result = sorted.map((d, i) => {
		const prev = sorted[i - 1];

		const pctChange = prev
			? ((d.amount - prev.amount) / Math.abs(prev.amount)) * 100
			: 0;

		return {
			...d,
			change: pctChange,
		};
	});

	return result;
};
