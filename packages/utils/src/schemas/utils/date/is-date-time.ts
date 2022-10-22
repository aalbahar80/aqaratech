import { isMatch } from 'date-fns';

// Reference: https://date-fns.org/v2.29.3/docs/isMatch

const ISO_8601_WITH_TIME = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx";

export const isDatetime = (value: string) =>
	isMatch(value, ISO_8601_WITH_TIME) && value.length === 24;
