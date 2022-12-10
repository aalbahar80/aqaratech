import { expect, test } from 'vitest';

import { DATE_TIME } from './dates.constants';
import { zodDatetime } from './zod-date-time';

const schema = zodDatetime();

test.each(DATE_TIME.VALID)('valid: %s', (value) => {
	expect(schema.safeParse(value).success).toBe(true);
});

test.each(DATE_TIME.INVALID)('invalid date: %s', (date) => {
	expect(schema.safeParse(date).success).toBe(false);

	expect(() => schema.parse(date)).toThrowError();
});

test('short dates are transformed to midnight UTC', () => {
	const date = '2021-01-01';

	expect(schema.parse(date)).toBe('2021-01-01T00:00:00.000Z');
});

test.each(DATE_TIME.VALID)('date transformation is idempotent: %s', (date) => {
	const first = schema.parse(date);

	expect(schema.parse(first)).toBe(first);
});

test('date transformation is idempotent for full datetime strings', () => {
	const date = '2021-01-01T00:00:00.000Z';

	const first = schema.parse(date);

	expect(schema.parse(first)).toBe(date);
});
