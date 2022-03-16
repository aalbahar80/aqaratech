import { format, differenceInCalendarDays } from 'date-fns';

export const getProgress = (start: Date, end: Date, ref?: Date): number => {
	const total = differenceInCalendarDays(end, start);
	const left = differenceInCalendarDays(end, ref ?? new Date());
	const result = left < 1 ? 100 : 100 - (left / total) * 100;
	const rounded = Math.round(result);
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
	short: boolean = true,
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

const forceDate = (date: Date | string | null): Date => {
	if (date instanceof Date) return date;
	if (typeof date === 'string') return new Date(date);
	console.warn('forceDate: date is not a Date or string');
	return new Date();
};

const inputDateFormat = 'yyyy-MM-dd';
export const dateToInput = (date: Date): string => {
	return format(date, inputDateFormat);
};

export const forceDateToInput = (date: Date | string | null): string => {
	return dateToInput(forceDate(date));
};
