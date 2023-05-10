type ListRepeat<
	T,
	N extends number,
	R extends unknown[] = [],
> = R['length'] extends N ? R : ListRepeat<T, N, [...R, T]>;

export const assertCount = <T, Count extends number>(
	items: T[],
	count: Count,
): items is ListRepeat<T, typeof count> => {
	return items.length === count;
};
