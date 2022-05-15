import { writable } from 'svelte/store';

type PaginationButtons = Array<number | null>;
export interface IPagination {
	pageIdx: number;
	pageCount: number;
	pageSize: number;
	itemCount: number;
	buttons: PaginationButtons;
	hasNext: boolean;
	hasPrevious: boolean;
}

export function createPagination(pgn: IPagination) {
	const { subscribe, update } = writable<IPagination>(pgn);

	return {
		subscribe,
		next: () =>
			update((n) => {
				const pageIdx = Math.min(n.pageIdx + 1, n.pageCount);
				const buttons = getButtons(pageIdx, n.pageCount);
				console.log({ buttons }, 'pagination.ts ~ 22');
				return {
					...n,
					pageIdx,
					buttons,
					hasPrevious: pageIdx > 1,
					hasNext: pageIdx < n.pageCount,
				};
			}),
		previous: () =>
			update((n) => {
				const pageIdx = Math.max(n.pageIdx - 1, 1);
				const buttons = getButtons(pageIdx, n.pageCount);
				return {
					...n,
					pageIdx,
					buttons,
					hasPrevious: pageIdx > 1,
					hasNext: pageIdx < n.pageCount,
				};
			}),
		setPage: (pageIdx: number) =>
			update((n) => {
				const buttons = getButtons(pageIdx, n.pageCount);
				return {
					...n,
					pageIdx,
					buttons,
					hasPrevious: pageIdx > 1,
					hasNext: pageIdx < n.pageCount,
				};
			}),
	};
}

export function getButtons(pageIdx: number, pageCount: number) {
	const center = [pageIdx - 2, pageIdx - 1, pageIdx, pageIdx + 1, pageIdx + 2],
		filteredCenter = center.filter((p) => p > 1 && p < pageCount),
		includeThreeLeft = pageIdx === 5,
		includeThreeRight = pageIdx === pageCount - 4,
		includeLeftDots = pageIdx > 5,
		includeRightDots = pageIdx < pageCount - 4;

	if (includeThreeLeft) filteredCenter.unshift(2);
	if (includeThreeRight) filteredCenter.push(pageCount - 1);

	if (includeLeftDots) filteredCenter.unshift(null);
	if (includeRightDots) filteredCenter.push(null);

	return [1, ...filteredCenter, pageCount];
}
