import { createTablePaginationModel } from '$lib/components/table/pagination/table-pagination-model';
import { handleServerPagination } from '$lib/components/table/tanstack-table/server-pagination';

import type { PaginatedDto } from '$api/openapi';
import type { PaginationState, Updater } from '@tanstack/svelte-table';

export const handlePagination = ({
	updater,
	url,
	paginationDto,
}: {
	updater: Updater<PaginationState>;
	url: URL;
	paginationDto: PaginatedDto;
}) => {
	const currentPaginationState =
		createTablePaginationModel(paginationDto).pagination;

	let desiredPaginationState: PaginationState;

	if (updater instanceof Function) {
		desiredPaginationState = updater(currentPaginationState);
	} else {
		desiredPaginationState = updater;
	}

	void handleServerPagination(desiredPaginationState, url);
};
