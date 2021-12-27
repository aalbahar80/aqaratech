import { differenceInCalendarDays } from 'date-fns';

export const getProgress = (start: Date, end: Date, ref: Date): number => {
    const total = differenceInCalendarDays(end, start);
    const left = differenceInCalendarDays(end, ref);
    const result = left < 1 ? 100 : 100 - (left / total) * 100;
    return Math.round(result);
}

// a function that calculates the number of days between two dates
export function daysLeft(end: Date, from: Date = new Date()): number {
	const diff = end.getTime() - from.getTime();
	return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// a function that take an ISO date and calculate the number of days left until that date
export function daysLeftFromISO(end: string, from?: string): number {
	if (!from) {
		return daysLeft(new Date(end));
	} else {
		return daysLeft(new Date(end), new Date(from));
	}
}

// define a function that take an ISO date and formats to MMM DD, YYYY
export function formatDate(date: string): string {
	return new Date(date).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}

interface DateDiff {
	pretext: string;
	main: string;
	unit: string;
	fullText: string;
}

// define a function that takes an ISO date
// returns the days remaining in days, or months, or years
export function formatDateDiff(date: string): DateDiff {
	const days = Math.abs(daysLeftFromISO(date));
	if (days < 7) {
		return {
			pretext: 'in',
			main: `${days}`,
			unit: 'days',
			fullText: `in ${days} days`,
		};
	}
	if (days > 6 && days < 30) {
		return {
			pretext: 'in',
			main: `${Math.ceil(days / 7)}`,
			unit: 'weeks',
			fullText: `in ${Math.ceil(days / 7)} weeks`,
		};
	}
	if (days > 29 && days < 365) {
		return {
			pretext: 'in',
			main: `${Math.ceil(days / 30)}`,
			unit: 'months',
			fullText: `in ${Math.ceil(days / 30)} months`,
		};
	}

	if (days > 364) {
		return {
			pretext: 'in',
			main: `${Math.ceil(days / 365)}`,
			unit: 'years',
			fullText: `in ${Math.ceil(days / 365)} years`,
		};
	}
	return {
		pretext: '',
		main: '',
		unit: '',
		fullText: ``,
	};
}
// a function that omits a key from an object
export function omit<T extends object, K extends keyof T>(
	obj: T,
	key: K,
): Omit<T, K> {
	const { [key]: value, ...rest } = obj;
	return rest;
}

// a function that calculates the progress between two dates
export function progress(end: string, start: string): number {
	const total = daysLeftFromISO(end, start);
	const left = daysLeftFromISO(end);
	const progress = left < 1 ? 100 : 100 - (left / total) * 100;
	// round progress to whole number
	return Math.round(progress);
}
