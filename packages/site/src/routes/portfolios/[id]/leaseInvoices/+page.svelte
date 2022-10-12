<script lang="ts">
	import { page } from '$app/stores';
	import ExportButton from '$lib/components/buttons/ExportButton.svelte';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import type { LeaseInvoiceDto } from '$api/openapi';
	import { entitiesMap } from '@self/utils';
	import type { ColumnDef } from '@tanstack/svelte-table';
	import type { PageData } from './$types';

	export let data: PageData;

	const columns: ColumnDef<LeaseInvoiceDto>[] = [
		{
			header: 'Post Date',
			footer: 'Post Date',
			id: 'postAt',
			accessorFn: (row) => toUTCFormat(row.postAt),
		},
		{
			header: 'Amount (KWD)',
			footer: 'Amount (KWD)',
			accessorKey: 'amount',
			cell: (info) => {
				return info.getValue<LeaseInvoiceDto['amount']>().toLocaleString();
			},
		},
		{
			header: 'Status',
			footer: 'Status',
			id: 'isPaid',
			accessorFn: (row) => (row.isPaid ? 'Paid' : 'Unpaid'),
		},
		{
			header: 'Location',
			footer: 'Location',
			columns: [
				{
					accessorFn: (row) => row.breadcrumbs.property?.label || '',
					id: 'propertyId',
					// cell: (info) => info.getValue(),
					header: 'Property',
					footer: 'Property',
					enableSorting: false,
				},
				{
					accessorFn: (row) => row.breadcrumbs.unit?.label || '',
					id: 'unitId',
					// cell: (info) => info.getValue(),
					header: 'Unit',
					footer: 'Unit',
					enableSorting: false,
				},
			],
		},
		{
			header: '',
			footer: '',
			id: 'view',
			accessorFn: (row) => `/${entitiesMap.leaseInvoice.urlName}/${row.id}`,
			cell: (info) => info.getValue(),
		},
	];
</script>

<Table
	{columns}
	items={data.invoices.results}
	itemCount={data.invoices.pagination.itemCount}
	pageCount={data.invoices.pagination.pageCount}
	pagination={{
		pageIndex: data.invoices.pagination.page - 1,
		pageSize: data.invoices.pagination.take,
	}}
	paginationType="server"
>
	<div slot="header-actions">
		<a href={`${$page.url.pathname}/csv`} download="leaseInvoices.csv">
			<ExportButton />
		</a>
	</div>
</Table>
