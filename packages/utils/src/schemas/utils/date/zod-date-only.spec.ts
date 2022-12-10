import { expect, test } from 'vitest';

import { DATE_ONLY } from './dates.constants';
import { zodDateOnly, zodDateOnlyOptional } from './zod-date-only';

const schema = zodDateOnly;
const optionalSchema = zodDateOnlyOptional;

test.each(DATE_ONLY.VALID)('valid: %s', (value) => {
	expect(schema.safeParse(value).success).toBe(true);
	expect(optionalSchema.safeParse(value).success).toBe(true);
});

test.each(DATE_ONLY.INVALID)('invalid date: %s', (date) => {
	expect(schema.safeParse(date).success).toBe(false);
	expect(optionalSchema.safeParse(date).success).toBe(false);

	expect(() => schema.parse(date)).toThrowError();
});

test('short dates are transformed to midnight UTC', () => {
	const date = '2021-01-01';

	expect(schema.parse(date)).toBe('2021-01-01T00:00:00.000Z');
	expect(optionalSchema.parse(date)).toBe('2021-01-01T00:00:00.000Z');
});

test('always returns midnight UTC', () => {
	const date = '2021-01-01T05:12:34.000Z';

	expect(() => schema.parse(date)).toThrowError();
	expect(() => optionalSchema.parse(date)).toThrowError();
});
