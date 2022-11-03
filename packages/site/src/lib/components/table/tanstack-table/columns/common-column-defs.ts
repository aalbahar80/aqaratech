import type { BreadcrumbsDto } from '$api/openapi';
import type { ColumnHelper } from '@tanstack/svelte-table';

export const locationColumnDef = <
	T extends { breadcrumbs: Partial<Pick<BreadcrumbsDto, 'property' | 'unit'>> },
>(
	columnHelper: ColumnHelper<T>,
) =>
	columnHelper.group({
		header: 'Location',
		footer: (props) => props.column.id,
		columns: [
			columnHelper.accessor('breadcrumbs', {
				id: 'property',
				header: 'Property',
				cell: (info) => info.getValue().property?.label || '',
				enableSorting: false,
			}),

			columnHelper.accessor('breadcrumbs', {
				id: 'unit',
				header: 'Unit',
				cell: (info) => info.getValue().unit?.label || '',
				enableSorting: false,
			}),
		],
	});
