import { subMonths } from 'date-fns';

export const defaultRange = 3;

/**
 * Figures out the date N months ago. Then returns the first day of that month.
 * Therefore, use 0 to get the first day of the current month.
 *
 * Uses UTC. Is agnostic to the client's timezone.
 */
export const rangeStart = (monthsAgo: number): string => {
	// Get the date/time N months ago
	const date = subMonths(new Date(), monthsAgo);

	// Get the equivalent UTC day/month/year
	const month = date.getUTCMonth();
	const year = date.getUTCFullYear();

	// Return a date object that represents midnight on that equivalent UTC day/month/year
	const result = new Date(Date.UTC(year, month, 1)).toISOString();
	return result;
};

// start of next month
export const defaultRangeEnd = () => {
	const now = new Date();
	const nextMonth = new Date(
		Date.UTC(now.getFullYear(), now.getMonth() + 1, 1),
	);
	return nextMonth.toISOString();
};

export const clampedDate = (date: string, min: string, max: string) => {
	const d = new Date(date);
	const minDate = new Date(min);
	const maxDate = new Date(max);
	if (d < minDate) {
		return minDate.toISOString();
	}
	if (d > maxDate) {
		return maxDate.toISOString();
	}
	return date;
};

export const getOneYearAgo = () => {
	const now = new Date();
	const oneYearAgo = new Date(
		Date.UTC(now.getFullYear() - 1, now.getMonth(), now.getDate()),
	);
	return oneYearAgo;
};

export const getOneYearLater = () => {
	const now = new Date();
	const oneYearLater = new Date(
		Date.UTC(now.getFullYear() + 1, now.getMonth(), now.getDate()),
	);
	return oneYearLater;
};
