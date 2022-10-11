import { goto } from '$app/navigation';
import { ORDER_BY, SORT_ORDER } from '$lib/constants/pagination-keys';
import type { SortingState } from '@tanstack/svelte-table';

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

	key ? url.searchParams.set(ORDER_BY, key) : url.searchParams.delete(ORDER_BY);

	if (desc === undefined) {
		url.searchParams.delete(SORT_ORDER);
	} else if (desc === true) {
		url.searchParams.set(SORT_ORDER, 'desc');
	} else if (desc === false) {
		url.searchParams.set(SORT_ORDER, 'asc');
	}

	await goto(url, { noscroll: true, keepfocus: true });
};
