import type { PaginatedDto } from '$api/openapi';
import type { PaginationState } from '@tanstack/svelte-table';

interface TablePaginationModel {
	itemCount: number;
	pageCount: number;
	pagination: PaginationState;
}

export const createTablePaginationModel = (
	pagination: PaginatedDto,
): TablePaginationModel => {
	return {
		itemCount: pagination.itemCount,
		pageCount: pagination.pageCount,
		pagination: {
			pageIndex: pagination.page - 1,
			pageSize: pagination.take,
		},
	};
};
