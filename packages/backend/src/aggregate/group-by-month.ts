import { GroupedByMonth } from 'src/aggregate/dto/grouped-by-month.dto';
import { monthsInRange } from 'src/utils/months-in-range';

export const groupByMonth = (
	records: Records[],
	options?: GroupByMonthOptions,
): GroupedByMonth[] => {
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

	// fill in missing months
	if (options?.includeEmptyMonths) {
		const withEmptyMonths = addEmptyMonths(byMonthArray, {
			start: options.start,
			end: options.end,
		});

		return withEmptyMonths;
	} else {
		return byMonthArray;
	}
};

export const addEmptyMonths = (
	records: GroupedByMonth[],
	options: { start: string; end: string },
) => {
	const months = monthsInRange(options.start, options.end);

	const recordsWithEmptyMonths = months.map((month) => {
		const record = records.find((r) => r.date === month);
		if (record) {
			return record;
		} else {
			return {
				date: month,
				amount: 0,
			};
		}
	});

	return recordsWithEmptyMonths;
};

interface Records {
	amount: number;
	postAt: Date;
}

type GroupByMonthOptions =
	| {
			includeEmptyMonths: false;
	  }
	| {
			includeEmptyMonths: true;
			start: string;
			end: string;
	  };
