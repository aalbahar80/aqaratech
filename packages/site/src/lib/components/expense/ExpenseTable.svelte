<script lang="ts">
	import type { ExpenseDto, PaginatedExpenseDto } from '$api/openapi';
	import { page } from '$app/stores';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterBarActions from '$lib/components/filter/FilterBarActions.svelte';
	import FilterBarActionsExport from '$lib/components/filter/FilterBarActionsExport.svelte';
	import {
		locationColumnDef,
		viewColumnDef,
	} from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import { createColumnHelper } from '@tanstack/svelte-table';

	export let data: PaginatedExpenseDto;

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
	items={data.results}
	paginationDto={data.pagination}
	{columns}
	paginationType="server"
>
	<div slot="filter" let:filters>
		<FilterBar responsive={filters}>
			<div slot="custom">
				<FilterBarActions>
					<FilterBarActionsExport />
				</FilterBarActions>
			</div>
		</FilterBar>
	</div>
</Table>
