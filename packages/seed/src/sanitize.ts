/**
 * Remove email property from each element in the array
 */
export const removeEmail = <T extends { email: string }>(
	array: T[],
): Omit<T, 'email'>[] => {
	return array.map((element) => {
		const { email, ...rest } = element;

		return rest;
	});
};

/**
 * Delete after removing permissions columns from the database.
 */
export const changePermissionsToUndefined = <
	T extends { permissions: unknown },
>(
	array: T[],
): Omit<T, 'permissions'>[] => {
	return array.map((element) => {
		const { permissions, ...rest } = element;

		return rest;
	});
};

/**
 * Convert date from 'yyyy-mm-dd' to 'yyyy-mm-ddT00:00:00.000Z' for each given property.
 */
export const convertToDatetimeObj = <
	K extends string,
	T extends { [P in K as K]: string | Date | null } & Record<string, any>,
>(
	key: K,
	obj: T,
): T => {
	const date = obj[key];

	if (typeof date !== 'string') {
		return obj;
	}

	const datetime = `${date as string}T00:00:00.000Z`;

	return {
		...obj,
		[key]: datetime,
	};
};

/**
 * Apply convertToDatetimeObj to each element in the array.
 */
export const convertToDatetimeArray = <
	K extends string,
	T extends { [P in K as K]: string | Date | null } & Record<string, any>,
>(
	keys: K[],
	obj: T,
): T => {
	const data = keys.reduce((acc, key) => {
		const datetimeObj = convertToDatetimeObj(key, acc);

		return datetimeObj;
	}, obj);

	return data;
};
