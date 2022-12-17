type NonEmptyArray<T> = [T, ...T[]];

export const hasItems = <T>(arr: T[]): arr is NonEmptyArray<T> => {
	return arr.length > 0;
};
