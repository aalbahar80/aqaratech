import { getProgress } from 'src/date/progress';
import { expect, test } from 'vitest';

const inputs: [string, string, Date | undefined, number][] = [
	// start, end, reference, percentageProgress
	['2020-01-01', '2020-01-31', new Date('2019-01-01'), 0],
	['2020-01-01', '2020-01-31', new Date('2020-01-01'), 0],
	['2020-01-01', '2020-01-31', new Date('2020-01-02'), 3],
	['2020-01-01', '2020-01-31', new Date('2020-01-31'), 100],
	['2020-01-01', '2020-01-31', undefined, 100],
	['2020-01-01', '2020-01-31', new Date('2020-01-01'), 0],
	['2020-01-01', '2020-01-31', new Date('2020-01-15'), 47],
	['2020-01-01', '2020-01-31', new Date('2020-01-30'), 97],
	['2020-01-01', '2020-01-31', new Date('2020-02-01'), 100],
];

test.each(inputs)(
	'getProgress(%s, %s, %s, %s)',
	(start, end, ref, expected) => {
		expect(getProgress(start, end, ref)).toBe(expected);
	},
);
