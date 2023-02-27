<script lang="ts">
	import { createColumnHelper } from '@tanstack/svelte-table';

	import { page } from '$app/stores';

	import type { ExpenseDto, PaginatedExpenseDto } from '$api/openapi';

	import { locale } from '$i18n/i18n-svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterBarActions from '$lib/components/filter/FilterBarActions.svelte';
	import FilterBarActionsExport from '$lib/components/filter/FilterBarActionsExport.svelte';
	import { fmtCell } from '$lib/components/table/tanstack-table/columns/as-date';
	import {
		locationColumnDef,
		viewColumnDef,
	} from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { getIntlLabel } from '$lib/i18n/get-intl-label';
	import { isRTL } from '$lib/i18n/locale-labels';

	export let data: PaginatedExpenseDto;

	const columnHelper = createColumnHelper<ExpenseDto>();

	const columns = [
		columnHelper.accessor('postAt', {
			header: getIntlLabel('postAt'),
			cell: fmtCell('date'),
		}),

		columnHelper.accessor('categoryId', {
			header: getIntlLabel('categoryId'),
			cell: (info) =>
				isRTL($locale) && info.row.original.expenseType?.labelAr
					? info.row.original.expenseType?.labelAr
					: info.row.original.expenseType?.labelEn,
		}),

		columnHelper.accessor('amount', {
			header: getIntlLabel('amount'),
			cell: fmtCell('currency'),
		}),

		locationColumnDef(columnHelper, {
			propertyColumnId: 'property.label',
			unitColumnId: 'unit.label',
		}),

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
