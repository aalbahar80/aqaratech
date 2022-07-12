import type { CombinedEnum, SortOrderEnum } from '@self/sdk';

export const parseParams = (url: URL) => {
	return {
		page: +(url.searchParams.get('p') || 1),
		take: +(url.searchParams.get('take') || 20),
		q: url.searchParams.get('q') ?? undefined,
		sortOrder: (url.searchParams.get('sortOrder') ?? 'desc') as SortOrderEnum,
		// TODO fix types vs manual type-cast
		orderBy: (url.searchParams.get('orderBy') as CombinedEnum) ?? undefined,
		filter: (url.searchParams.get('filter') as unknown as object) ?? undefined,
	};
};
