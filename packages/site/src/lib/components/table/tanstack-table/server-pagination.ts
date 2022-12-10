import {
	DEFAULT_PAGINATION_KEY,
	PAGE_SIZE,
} from '$lib/constants/pagination-keys';

import type { PaginationState } from '@tanstack/svelte-table';

import { goto } from '$app/navigation';

export const handleServerPagination = async (
	pagination: PaginationState,
	pageUrl: URL,
) => {
	const url = new URL(pageUrl);

	url.searchParams.set(
		DEFAULT_PAGINATION_KEY,
		// add one to handle zero-based index
		(pagination.pageIndex + 1).toString(),
	);

	url.searchParams.set(PAGE_SIZE, pagination.pageSize.toString());

	await goto(url, { noScroll: true, keepFocus: true });
};
