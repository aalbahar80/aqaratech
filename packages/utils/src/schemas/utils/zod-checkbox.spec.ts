import { expect, test } from 'vitest';
import { zodCheckbox } from './zod-checkbox';

const parsedToTrue = [true, 'on'];

const parsedToFalse = [false, undefined];

const invalid = ['off', '', null, 0, 1, '1', '0', 'true', 'false', 'abc'];

test.each(parsedToTrue)('zodCheckbox.parse(%s) should return true', (arg) => {
	expect(zodCheckbox.parse(arg)).toBe(true);
});

test.each(parsedToFalse)('zodCheckbox.parse(%s) should return false', (arg) => {
	expect(zodCheckbox.parse(arg)).toBe(false);
});

test.each(invalid)('zodCheckbox.parse(%s) should throw', (arg) => {
	expect(() => zodCheckbox.parse(arg)).toThrowError();
});
