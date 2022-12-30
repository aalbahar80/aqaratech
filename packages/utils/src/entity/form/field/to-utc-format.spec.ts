import { expect, test } from 'vitest';
import { toUTCFormat, toUTCFormatMonthYear } from './to-utc-format';

const valid: [string, unknown, unknown][] = [
	// a list of valid inputs. The first item should be either a short or long iso date string
	// the second item should be the expected output
	['2020-12-31', 'Dec 31, 2020', 'Dec 2020'],
	['2021-01-01', 'Jan 1, 2021', 'Jan 2021'],
	['2021-01-01T00:00:00.000Z', 'Jan 1, 2021', 'Jan 2021'],
	['2021-01-01T20:00:00.000Z', 'Jan 1, 2021', 'Jan 2021'],
	['2021-01-01T23:59:59.999Z', 'Jan 1, 2021', 'Jan 2021'],
	['2021-01-02T00:00:00.000Z', 'Jan 2, 2021', 'Jan 2021'],
	['2021-01-02T00:01:00.000Z', 'Jan 2, 2021', 'Jan 2021'],
];

test.each(valid)('toUTCFormat(%s)', (input, expected, expectedMonthYear) => {
	expect(toUTCFormat(input)).toBe(expected);

	expect(toUTCFormatMonthYear(input)).toBe(expectedMonthYear);
});

// different timezones

const timezones = [
	['2021-01-01T00:00:00.000+0300', 'Dec 31, 2020'],
	['2021-01-01T00:00:00.000+0400', 'Dec 31, 2020'],
];

test.each(timezones)('is converted to UTC(%s)', (input, expected) => {
	expect(toUTCFormat(input)).toBe(expected);
});
