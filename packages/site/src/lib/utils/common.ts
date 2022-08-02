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

export const objectKeys = <Obj>(obj: Obj): (keyof Obj)[] =>
	Object.keys(obj) as (keyof Obj)[];

export const objectEntries = <Obj>(obj: Obj): [keyof Obj, Obj[keyof Obj]][] =>
	Object.entries(obj) as [keyof Obj, Obj[keyof Obj]][];

export const concatIfExists = (strings: (string | null | undefined)[]) => {
	return strings.filter((str) => str).join(' ');
};

export const forceDate = (date: Date | string | number): Date => {
	if (date instanceof Date) return date;
	if (typeof date === 'string' || typeof date === 'number') {
		try {
			return new Date(date);
		} catch (e) {
			throw new Error('Can not parse date');
		}
	}
	console.warn('forceDate: date is not a Date or string or number');
	return new Date();
};

const inputDateFormat = 'yyyy-MM-dd';
export const dateToInput = (date: Date): string => {
	try {
		const result = toUTCFormat(date, inputDateFormat);
		return result;
	} catch (e) {
		throw new Error(`Can not format date to ${inputDateFormat}.`);
	}
};

export const forceDateToInput = (date: Date | string | number): string => {
	try {
		return dateToInput(forceDate(date));
	} catch (e) {
		// TODO how to check error type?
		console.warn(e);
		return '';
	}
};

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
