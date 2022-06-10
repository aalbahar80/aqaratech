import { differenceInCalendarDays } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

export const getProgress = (start: Date, end: Date, ref?: Date): number => {
	const total = differenceInCalendarDays(end, start);
	const left = differenceInCalendarDays(end, ref ?? new Date());
	const result = left < 1 ? 100 : 100 - (left / total) * 100;
	const rounded = Math.max(0, Math.round(result));
	return rounded;
};

export const dateFormat = (date: Date): string =>
	formatInTimeZone(date, 'UTC', 'MMM dd, yy');

export const toUTCFormat = (date: Date, format = 'MMM dd, yy'): string =>
	formatInTimeZone(date, 'UTC', format);

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
	console.log({ date }, 'common.ts ~ 46');
	try {
		const result = formatInTimeZone(date, 'UTC', inputDateFormat);
		console.log({ result }, 'common.ts ~ 49');
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

// TODO: DRY this with Entity classes once the following is fixed:
// Problem: importing property.class in a test file breaks vscode playwright extenstion
export const getAddress = <
	T extends {
		area?: string | null;
		block?: string | null;
		street?: string | null;
		number?: string | null;
	},
>(
	item: T,
	full = false,
) => {
	if (full) {
		return concatIfExists([
			item.area,
			'قطعة',
			item.block,
			item.street,
			'مبنى',
			item.number,
		]);
	}
	return concatIfExists([item.area, 'ق', item.block, 'م', item.number]);
};

export const getUnitLabel = <
	T extends { type?: string | null; unitNumber?: string | null },
>(
	item: T,
) => {
	if (item.type && item.unitNumber) {
		return concatIfExists([item.type, item.unitNumber]);
	} else if (item.unitNumber) {
		return item.unitNumber;
	} else {
		console.warn('no type or unitNumber');
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
