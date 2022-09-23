export const groupByMonth = (
	records: { amount: number; postAt: Date }[],
): { date: string; amount: number }[] => {
	const byMonth = records.reduce<Record<string, number>>((acc, record) => {
		const date = record.postAt.toISOString().split('T')[0];
		const month = date.split('-')[1];
		const year = date.split('-')[0];
		const monthYear = `${month}-${year}`;
		if (acc[monthYear]) {
			acc[monthYear] += record.amount;
		} else {
			acc[monthYear] = record.amount;
		}
		return acc;
	}, {});

	// return dates as ISO strings
	const byMonthArray = Object.keys(byMonth).map((monthYear) => {
		return {
			date: `${monthYear.split('-')[1]}-${
				monthYear.split('-')[0]
			}-01T00:00:00.000Z`,
			amount: byMonth[monthYear],
		};
	});

	// sort by date
	byMonthArray.sort((a, b) => {
		const aDate = new Date(a.date);
		const bDate = new Date(b.date);
		return bDate.getTime() - aDate.getTime();
	});

	return byMonthArray;
};
