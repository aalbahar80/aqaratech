import { expect, test } from 'vitest';
import { zodNumberOptional } from './zod-number';

const valid = [
	['0', 0],
	['1', 1],
	['123', 123],
	[0, 0],
	[1, 1],
	[123, 123],
	[123.45, 123.45],
	[123.456, 123.456],

	// return null
	[null, null],
	['', null],
	['abc', null],

	// return undefined
	[undefined, undefined],
];

test.each(valid)(
	'zodNumberOptional.parse(%s) should return %s',
	// @ts-expect-error fix this
	(arg, expected) => {
		expect(zodNumberOptional.parse(arg)).toBe(expected);
	},
);

const invalid = [true, false, [], {}];

test.each(invalid)('zodNumberOptional.parse(%s) should throw', (arg) => {
	expect(() => zodNumberOptional.parse(arg)).toThrowError();
});
