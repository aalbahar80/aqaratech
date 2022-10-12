import type { LeaseInvoiceDto } from '$api/openapi';
import GenericCellSvelte from '$lib/components/table/lease-invoices/GenericCell.svelte';
import { toUTCFormat } from '$lib/utils/common';
import { entitiesMap } from '@self/utils';
import { renderComponent, type ColumnDef } from '@tanstack/svelte-table';

type ColumnKeys =
	| keyof LeaseInvoiceDto
	| 'location'
	| 'view'
	| 'unitId'
	| 'propertyId';

type ColumnsConfig2 = {
	[K in ColumnKeys as K]: ColumnDef<LeaseInvoiceDto>;
};

export const baseColumns: ColumnsConfig2 = {
	postAt: {
		header: 'Post Date',
		footer: 'Post Date',
		id: 'postAt',
		accessorFn: (row) => toUTCFormat(row.postAt),
	},
	amount: {
		header: 'Amount (KWD)',
		footer: 'Amount (KWD)',
		accessorKey: 'amount',
		cell: (info) => {
			return info.getValue<LeaseInvoiceDto['amount']>().toLocaleString();
		},
	},
	isPaid: {
		header: 'Status',
		footer: 'Status',
		id: 'isPaid',
		accessorKey: 'isPaid',
		cell: (info) => {
			const isPaid = info.getValue<LeaseInvoiceDto['isPaid']>();

			return renderComponent(GenericCellSvelte, {
				value: isPaid ? 'Paid' : 'Unpaid',
				classes: isPaid ? 'text-green-600' : 'text-red-600',
			});
		},
	},
	unitId: {
		accessorFn: (row) => row.breadcrumbs.property?.label || '',
		id: 'propertyId',
		// cell: (info) => info.getValue(),
		header: 'Property',
		footer: 'Property',
		enableSorting: false,
	},
	propertyId: {
		accessorFn: (row) => row.breadcrumbs.unit?.label || '',
		id: 'unitId',
		// cell: (info) => info.getValue(),
		header: 'Unit',
		footer: 'Unit',
		enableSorting: false,
	},
	view: {
		header: '',
		footer: '',
		id: 'view',
		accessorFn: (row) => `/${entitiesMap.leaseInvoice.urlName}/${row.id}`,
		cell: (info) => info.getValue(),
	},
};
