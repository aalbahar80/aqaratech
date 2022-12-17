import * as R from 'remeda';

import { GroupedByMonth } from 'src/aggregate/dto/grouped-by-month.dto';
import { isoToYearMonth, monthsInRange } from 'src/utils/months-in-range';

export const groupByMonth = (
	records: Records[],
	options: GroupByMonthOptions,
) => {
	// group by year-month
	const grouped = R.groupBy(records, (record) =>
		isoToYearMonth(record.postAt.toISOString()),
	);

	// sum up the amounts
	const summed = R.mapValues(grouped, (records) =>
		records.reduce((sum, record) => sum + record.amount, 0),
	);

	let months: string[];

	if (options.includeEmptyMonths) {
		months = monthsInRange(options.start, options.end);
	} else {
		months = Object.keys(summed);
	}

	// sort by date - newest first
	months.sort((a, b) => b.localeCompare(a));

	// convert to array of objects
	const array: GroupedByMonth[] = [];

	months.forEach((month) => {
		array.push({ date: month, amount: summed[month] ?? 0 });
	});

	return array satisfies GroupedByMonth[];
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

interface GroupByMonthOptions {
	includeEmptyMonths: boolean;
	start: string;
	end: string;
}
