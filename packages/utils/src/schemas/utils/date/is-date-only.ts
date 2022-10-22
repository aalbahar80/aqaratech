import { isMatch } from 'date-fns';

// Reference: https://date-fns.org/v2.29.3/docs/isMatch

export const ISO_8601 = 'yyyy-MM-dd';

export const isDateOnly = (value: string) =>
	isMatch(value, ISO_8601) && value.length === 10;
