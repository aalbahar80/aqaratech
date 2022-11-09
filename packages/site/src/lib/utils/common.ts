import { differenceInCalendarDays } from 'date-fns';
//@ts-ignore
import { formatInTimeZone } from 'date-fns-tz/esm';

export const getProgress = (start: string, end: string, ref?: Date): number => {
	const total = differenceInCalendarDays(new Date(end), new Date(start));
	const left = differenceInCalendarDays(new Date(end), ref ?? new Date());
	const result = left < 1 ? 100 : 100 - (left / total) * 100;
	const rounded = Math.max(0, Math.round(result));
	return rounded;
};

/**
 * Format a date in UTC timezone.
 */
export const toUTCFormat = (
	date: Date | string,
	format = 'MMM dd, yy',
): string => formatInTimeZone(date, 'UTC', format);

export const kwdFormat = (amount: number | null): string =>
	amount?.toLocaleString('en-KW', {
		style: 'currency',
		currency: 'KWD',
		maximumFractionDigits: 0,
		minimumFractionDigits: 0,
	}) ?? '-';

export const objectKeys = <Obj>(obj: Obj): (keyof Obj)[] => {
	return Object.keys(obj) as (keyof Obj)[];
};

export const objectValues = <Obj>(obj: Obj): Obj[keyof Obj][] => {
	return Object.values(obj) as Obj[keyof Obj][];
};

export const objectEntries = <Obj>(obj: Obj): [keyof Obj, Obj[keyof Obj]][] =>
	Object.entries(obj) as [keyof Obj, Obj[keyof Obj]][];

// export const concatIfExists = (strings: (string | null | undefined)[]) => {
// 	return strings.filter((str) => str).join(' ');
// };

export const startCase = (str: string): string =>
	str.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
		return str.toUpperCase();
	});

export const toDateInput = (date: any) => {
	if (date instanceof Date) {
		return date.toISOString().split('T')[0];
	}
	return date;
};

/**
 * Returns name of month from a 'yyyy-mm' string.
 */
export const monthFromShort = (yearMonth: string) => {
	const month = yearMonth.split('-')[1];

	return new Date(0, parseInt(month) - 1).toLocaleString('default', {
		month: 'long',
	});
};
