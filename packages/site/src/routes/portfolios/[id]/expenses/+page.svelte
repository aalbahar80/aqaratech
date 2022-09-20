<script lang="ts">
	import { page } from '$app/stores';
	import ExportButton from '$lib/components/buttons/ExportButton.svelte';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import type { ExpenseDto } from '$api/openapi';
	import { entitiesMap } from '@self/utils';
	import type { ColumnDef } from '@tanstack/svelte-table';
	import type { PageData } from './$types';

	export let data: PageData;

	const columns: ColumnDef<ExpenseDto>[] = [
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
				return info.getValue<ExpenseDto['amount']>().toLocaleString();
			},
		},
		{
			header: 'Type',
			footer: 'Type',
			accessorFn: (row) => row.expenseType?.labelEn || '',
			cell: (info) => info.getValue(),
			enableSorting: false,
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
			accessorFn: (row) => `/${entitiesMap.expense.urlName}/${row.id}`,
			cell: (info) => info.getValue(),
		},
	];
</script>

<Table
	{columns}
	items={data.expenses.results}
	itemCount={data.expenses.pagination.itemCount}
	pageCount={data.expenses.pagination.pageCount}
	pagination={{
		pageIndex: data.expenses.pagination.page - 1,
		pageSize: data.expenses.pagination.take,
	}}
>
	<div slot="header-actions">
		<a href={`${$page.url.pathname}/csv`} download="expenses.csv">
			<ExportButton />
		</a>
	</div>
</Table>
