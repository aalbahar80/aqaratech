export const kwdFormat = (amount: number | null): string =>
	amount?.toLocaleString('en-KW', {
		style: 'currency',
		currency: 'KWD',
		maximumFractionDigits: 0,
		minimumFractionDigits: 0,
	}) ?? '-';

export const objectKeys = <Obj extends Record<string, unknown>>(
	obj: Obj,
): (keyof Obj)[] => {
	return Object.keys(obj) as (keyof Obj)[];
};

export const objectValues = <Obj extends Record<string, unknown>>(
	obj: Obj,
): Obj[keyof Obj][] => {
	return Object.values(obj) as Obj[keyof Obj][];
};

export const objectEntries = <Obj extends Record<string, unknown>>(
	obj: Obj,
): [keyof Obj, Obj[keyof Obj]][] =>
	Object.entries(obj) as [keyof Obj, Obj[keyof Obj]][];

// export const concatIfExists = (strings: (string | null | undefined)[]) => {
// 	return strings.filter((str) => str).join(' ');
// };

/**
 * Returns name of month from a 'yyyy-mm' string.
 */
export const monthFromShort = (yearMonth: string) => {
	const month = yearMonth.split('-')[1];

	if (!month) {
		return '';
	}

	return new Date(0, parseInt(month) - 1).toLocaleString('default', {
		month: 'long',
	});
};
