import { expect, test } from 'vitest';
import { DATE_ONLY } from './date/dates.constants';
import { zodIsDatetimeString } from './zod-date-string';

const schema = zodIsDatetimeString();

test.each(DATE_ONLY.VALID)('valid: %s', (value) => {
	expect(schema.safeParse(value).success).toBe(true);
});

test.each(DATE_ONLY.INVALID)('invalid date: %s', (date) => {
	expect(schema.safeParse(date).success).toBe(false);

	expect(() => schema.parse(date)).toThrowError();
});

test('short dates are transformed to midnight UTC', () => {
	const date = '2021-01-01';

	expect(schema.parse(date)).toBe('2021-01-01T00:00:00.000Z');
});

test.each(DATE_ONLY.VALID)('date transformation is idempotent: %s', (date) => {
	const first = schema.parse(date);

	expect(schema.parse(first)).toBe(first);
});

test('date transformation is idempotent for full datetime strings', () => {
	const date = '2021-01-01T00:00:00.000Z';

	const first = schema.parse(date);

	expect(schema.parse(first)).toBe(date);
});

test('always returns midnight UTC', () => {
	const date = '2021-01-01T05:12:34.000Z';

	expect(() => schema.parse(date)).toThrowError();
});
