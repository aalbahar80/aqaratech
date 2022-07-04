import type { FindAllSortOrderEnum } from '@self/sdk';

export const parseParams = (url: URL) => {
	return {
		page: +(url.searchParams.get('p') || 1),
		take: +(url.searchParams.get('take') || 20),
		q: url.searchParams.get('q') ?? undefined,
		sortOrder: (url.searchParams.get('sortOrder') ??
			'asc') as FindAllSortOrderEnum,
		orderBy: url.searchParams.get('orderBy') ?? undefined,
		filter: url.searchParams.get('filter') ?? undefined,
	};
};
