import {
	DEFAULT_PAGINATION_KEY,
	ORDER_BY,
	PAGE_SIZE,
	SORT_ORDER,
} from '$lib/constants/pagination-keys';
import type { CombinedEnum, SortOrderEnum } from '$api/openapi';

export const parseParams = (searchParams: URLSearchParams) => {
	return {
		page: +(searchParams.get(DEFAULT_PAGINATION_KEY) || 1),
		take: +(searchParams.get(PAGE_SIZE) || 20),
		sortOrder: (searchParams.get(SORT_ORDER) ?? 'desc') as SortOrderEnum,
		// TODO fix types vs manual type-cast
		orderBy: (searchParams.get(ORDER_BY) as CombinedEnum) ?? undefined,
		filter: (searchParams.get('filter') as unknown as object) ?? undefined,
	};
};
