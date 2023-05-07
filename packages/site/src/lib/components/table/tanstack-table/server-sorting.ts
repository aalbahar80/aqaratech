/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
import { goto } from '$app/navigation';

import type { SortingState } from '@tanstack/svelte-table';

import { SORT } from '$lib/constants/pagination-keys';

/**
 * Navigate to a new page with the given sorting state.
 */
export const handleServerSorting = async (
	sorting: SortingState,
	currentUrl: URL,
) => {
	const url = new URL(currentUrl);
	const key = sorting[0]?.id;
	const desc = sorting[0]?.desc;

	if (key === undefined || desc === undefined) {
		url.searchParams.delete(SORT);
	} else if (desc === true) {
		url.searchParams.set(SORT, key);
	} else if (desc === false) {
		url.searchParams.set(SORT, `-${key}`);
	}

	await goto(url, { noScroll: true, keepFocus: true });
};
