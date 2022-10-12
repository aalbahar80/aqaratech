<script lang="ts">
	import { page } from '$app/stores';
	import ExportButton from '$lib/components/buttons/ExportButton.svelte';
	import { baseColumns } from '$lib/components/table/lease-invoices/columns';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const columns = [
		baseColumns.postAt,
		baseColumns.isPaid,
		baseColumns.amount,
		{
			header: 'Location',
			footer: 'Location',
			columns: [
				{
					...baseColumns.unitId,
					enableSorting: false,
				},
				{
					...baseColumns.propertyId,
					enableSorting: false,
				},
			],
		},
		baseColumns.view,
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
