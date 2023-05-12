import { test } from 'vitest';

import { groupByMonth } from './group-by-month';

test('groupByMonth: basic functionality', () => {
	const records = [
		{ amount: 100, date: new Date('2022-01-01') },
		{ amount: 200, date: new Date('2022-01-15') },
		{ amount: 300, date: new Date('2022-02-01') },
	];

	const options = {
		includeEmptyMonths: false,
		start: '2022-01',
		end: '2022-02',
	};

	const result = groupByMonth(records, options);
	expect(result).toHaveLength(2);
	expect(result[0]).toEqual({ date: '2022-02', amount: 300 });
	expect(result[1]).toEqual({ date: '2022-01', amount: 300 });
});

test('groupByMonth: include empty months', () => {
	const records = [
		{ amount: 100, date: new Date('2022-01-01') },
		{ amount: 200, date: new Date('2022-03-01') },
	];

	const options = {
		includeEmptyMonths: true,
		start: '2022-01',
		end: '2022-03',
	};

	const result = groupByMonth(records, options);
	expect(result).toHaveLength(3);
	expect(result[0]).toEqual({ date: '2022-03', amount: 200 });
	expect(result[1]).toEqual({ date: '2022-02', amount: 0 });
	expect(result[2]).toEqual({ date: '2022-01', amount: 100 });
});

test('groupByMonth: empty records', () => {
	const records: never[] = [];

	const options = {
		includeEmptyMonths: true,
		start: '2022-01',
		end: '2022-02',
	};

	const result = groupByMonth(records, options);
	expect(result).toHaveLength(2);
	expect(result[0]).toEqual({ date: '2022-02', amount: 0 });
	expect(result[1]).toEqual({ date: '2022-01', amount: 0 });
});
