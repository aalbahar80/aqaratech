<script lang="ts">
	import type { ExpenseDto } from '$api/openapi';
	import { page } from '$app/stores';
	import ExportButton from '$lib/components/buttons/ExportButton.svelte';
	import {
		locationColumnDef,
		viewColumnDef,
	} from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import { createColumnHelper } from '@tanstack/svelte-table';
	import type { PageData } from './$types';

	export let data: PageData;

	const columnHelper = createColumnHelper<ExpenseDto>();

	const columns = [
		columnHelper.accessor('postAt', {
			header: 'Post Date',
			cell: (info) => toUTCFormat(info.getValue().toLocaleString()),
		}),

		columnHelper.accessor('expenseType', {
			header: 'Type',
			// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
			cell: (info) => info.getValue()?.labelEn || '',
		}),

		columnHelper.accessor('amount', {
			header: 'Amount (KWD)',
			cell: (info) => info.getValue().toLocaleString(),
		}),

		locationColumnDef(columnHelper),

		viewColumnDef(columnHelper, 'expense', $page.params),
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
	paginationType="server"
>
	<div slot="header-actions">
		<a href={`${$page.url.pathname}/csv`} download="expenses.csv">
			<ExportButton />
		</a>
	</div>
</Table>
