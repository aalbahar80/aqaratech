import { format, differenceInCalendarDays } from 'date-fns';

export const getProgress = (start: Date, end: Date, ref?: Date): number => {
	const total = differenceInCalendarDays(end, start);
	const left = differenceInCalendarDays(end, ref ?? new Date());
	const result = left < 1 ? 100 : 100 - (left / total) * 100;
	const rounded = Math.max(0, Math.round(result));
	return rounded;
};

export const dateFormat = (date: Date): string => format(date, 'MMM dd, yy');

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

export const getName = <
	T extends {
		firstName: string | null;
		lastName: string | null;
		secondName?: string | null;
		thirdName?: string | null;
	},
>(
	person: T,
	short = true,
): string => {
	if (short) {
		return concatIfExists([person.firstName, person.lastName]);
	}
	return concatIfExists([
		person.firstName,
		person.secondName,
		person.thirdName,
		person.lastName,
	]);
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
		return format(date, inputDateFormat);
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
