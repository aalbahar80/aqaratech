<script lang="ts">
	import { createColumnHelper } from '@tanstack/svelte-table';

	import { page } from '$app/stores';

	import { toUTCFormat } from '@self/utils';

	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterBarActions from '$lib/components/filter/FilterBarActions.svelte';
	import FilterBarActionsExport from '$lib/components/filter/FilterBarActionsExport.svelte';
	import {
		locationColumnDef,
		viewColumnDef,
	} from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { getIntlLabel } from '$lib/i18n/get-intl-label';

	import type { ExpenseDto, PaginatedExpenseDto } from '$api/openapi';

	export let data: PaginatedExpenseDto;

	const columnHelper = createColumnHelper<ExpenseDto>();

	const columns = [
		columnHelper.accessor('postAt', {
			header: getIntlLabel('postAt'),
			cell: (info) => toUTCFormat(info.getValue().toLocaleString()),
		}),

		columnHelper.accessor('categoryId', {
			header: getIntlLabel('categoryId'),
			cell: (info) => info.row.original.expenseType?.labelEn,
		}),

		columnHelper.accessor('amount', {
			header: getIntlLabel('amount'),
			cell: (info) => info.getValue().toLocaleString(),
		}),

		locationColumnDef(columnHelper),

		viewColumnDef(columnHelper, 'expense', $page.params),
	];
</script>

<Table items={data.results} paginationDto={data.pagination} {columns}>
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
