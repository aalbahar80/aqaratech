import type { List } from 'ts-toolbelt';

export const assertCount = <T, Count extends number>(
	items: T[],
	count: Count,
): items is List.Repeat<T, typeof count> => {
	return items.length === count;
};
