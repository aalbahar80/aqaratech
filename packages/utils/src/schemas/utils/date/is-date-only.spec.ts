import { expect, test } from 'vitest';

import { DATE_ONLY } from './dates.constants';
import { isDateOnly } from './is-date-only';

test.each(DATE_ONLY.VALID)('valid: %s', (value) => {
	expect(isDateOnly(value)).toBe(true);
});

test.each(DATE_ONLY.INVALID)('invalid date: %s', (date) => {
	expect(isDateOnly(date)).toBe(false);
});
