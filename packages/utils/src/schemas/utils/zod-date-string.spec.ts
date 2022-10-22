import { expect, test } from 'vitest';
import { zodIsDateString } from './zod-date-string';

const schema = zodIsDateString();

const valid = ['2021-01-01', '2021-01-01T00:00:00.000Z'];

test.each(valid)('valid: %s', (value) => {
	expect(schema.safeParse(value).success).toBe(true);
});

const invalid = [
	'2021-1-1',
	'2021-1-1T00:00:00.000Z',
	'2019-09-26T07:58:30.996+0200',
];

test.each(invalid)('invalid dates', (date) => {
	expect(schema.safeParse(date).success).toBe(false);

	expect(() => schema.parse(date)).toThrowError();
});
