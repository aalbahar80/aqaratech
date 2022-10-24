import { expect, test } from 'vitest';
import { zodEmpty } from './zod-empty';

const valid = ['', null, undefined];

const invalid = ['2021-01-01', '2021-01-01T00:00:00.000Z', 'abc', 123, ' '];

test.each(valid)('valid: %s', (value) => {
	expect(zodEmpty().safeParse(value).success).toBe(true);
});

test.each(invalid)('invalid date: %s', (date) => {
	expect(zodEmpty().safeParse(date).success).toBe(false);

	expect(() => zodEmpty().parse(date)).toThrowError();
});
