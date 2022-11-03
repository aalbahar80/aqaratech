import type { BreadcrumbsDto } from '$api/openapi';
import type { ColumnHelper } from '@tanstack/svelte-table';

export const locationColumnDef = <T extends Breadcrumbs>(
	columnHelper: ColumnHelper<T>,
) =>
	columnHelper.group({
		header: 'Location',
		footer: (props) => props.column.id,
		columns: [
			columnHelper.accessor((a) => a.breadcrumbs.property, {
				id: 'property',
				header: 'Property',
				cell: (info) =>
					info.getValue<T['breadcrumbs']['property']>()?.label ?? '',
				enableSorting: false,
			}),

			columnHelper.accessor((a) => a.breadcrumbs.unit, {
				id: 'unit',
				header: 'Unit',
				cell: (info) => info.getValue<T['breadcrumbs']['unit']>()?.label ?? '',
				enableSorting: false,
			}),
		],
	});

interface Breadcrumbs {
	breadcrumbs: Partial<Pick<BreadcrumbsDto, 'property' | 'unit'>>;
}
