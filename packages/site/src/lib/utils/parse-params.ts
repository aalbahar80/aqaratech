import { DEFAULT_PAGINATION_KEY } from '$lib/constants/pagination-keys';
import type { CombinedEnum, SortOrderEnum } from '@self/sdk';

export const parseParams = (searchParams: URLSearchParams) => {
	return {
		page: +(searchParams.get(DEFAULT_PAGINATION_KEY) || 1),
		take: +(searchParams.get('take') || 20),
		q: searchParams.get('q') ?? undefined,
		sortOrder: (searchParams.get('sortOrder') ?? 'desc') as SortOrderEnum,
		// TODO fix types vs manual type-cast
		orderBy: (searchParams.get('orderBy') as CombinedEnum) ?? undefined,
		filter: (searchParams.get('filter') as unknown as object) ?? undefined,
	};
};
