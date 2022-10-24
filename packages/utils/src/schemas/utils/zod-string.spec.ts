import { expect, test } from 'vitest';
import { zodString } from './zod-string';

const valid = ['abc', '123', 'abc 123', ' abc 123 ', ' abc 123 ', ' abc 123 '];

const invalid = ['', null, undefined];

test.each(valid)('valid: %s', (value) => {
	expect(zodString.safeParse(value).success).toBe(true);
});

test.each(invalid)('invalid date: %s', (date) => {
	expect(zodString.safeParse(date).success).toBe(false);

	expect(() => zodString.parse(date)).toThrowError();
});
