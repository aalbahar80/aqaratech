import { subMonths } from 'date-fns';

export const defaultRange = 6;

export const rangeStart = (monthsAgo: number): string => {
	// Get the date/time N months ago
	const date = subMonths(new Date(), monthsAgo);

	// Get the equivalent UTC day/month/year
	const day = date.getUTCDate();
	const month = date.getUTCMonth();
	const year = date.getUTCFullYear();

	// Return a date object that represents midnight on that equivalent UTC day/month/year
	const result = new Date(Date.UTC(year, month, day)).toISOString();
	return result;
};
