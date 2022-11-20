/**
 * Formats a date in UTC timezone.
 */
export const toUTCFormat = (date: string): string => {
	const result = new Intl.DateTimeFormat('en-US', {
		timeZone: 'UTC',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	}).format(new Date(date));

	return result;
};

export const toUTCFormatMonthYear = (date: string): string => {
	const result = new Intl.DateTimeFormat('en-US', {
		timeZone: 'UTC',
		year: 'numeric',
		month: 'short',
	}).format(new Date(date));

	return result;
};
