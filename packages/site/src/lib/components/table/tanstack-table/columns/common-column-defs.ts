import type { LeaseDto, LeaseInvoiceDto } from '$api/openapi';
import type { ColumnHelper } from '@tanstack/svelte-table';

export const locationColumnDef = <T extends LeaseDto | LeaseInvoiceDto>(
	columnHelper: ColumnHelper<T>,
) =>
	columnHelper.group({
		header: 'Location',
		footer: (props) => props.column.id,
		columns: [
			columnHelper.accessor('breadcrumbs.property.label', {
				id: 'property',
				header: 'Property',
				cell: (info) => info.getValue<string>(),
				enableSorting: false,
			}),

			columnHelper.accessor('breadcrumbs.unit.label', {
				id: 'unit',
				header: 'Unit',
				cell: (info) => info.getValue<string>(),
				enableSorting: false,
			}),
		],
	});
