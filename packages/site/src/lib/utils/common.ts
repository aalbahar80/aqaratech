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
export const dateFromShort = (yearMonth: string) => {
	const month = yearMonth.split('-')[1];

	if (!month) {
		return '';
	}

	const date = new Date(0, parseInt(month) - 1);

	return date;
};
