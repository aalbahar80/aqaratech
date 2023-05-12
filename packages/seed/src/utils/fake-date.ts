import { faker } from '@faker-js/faker';

import { TIMESPAN } from '../constants';

/**
 * Return a random date in the past.
 *
 * Format: YYYY-MM-DD
 */
export const fakeDate = (span: number = TIMESPAN) =>
	faker.date.past({ years: span }).toISOString().slice(0, 10);
