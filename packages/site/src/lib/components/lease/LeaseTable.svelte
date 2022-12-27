<script lang="ts">
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';

	import { page } from '$app/stores';

	import { getProgress, getRoute, PageType, toUTCFormat } from '@self/utils';

	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterBarButtonForm from '$lib/components/filter/FilterBarButtonForm.svelte';
	import FilterHero from '$lib/components/filter/FilterHero.svelte';
	import RadialProgress from '$lib/components/RadialProgress.svelte';
	import ActionCell from '$lib/components/table/tanstack-table/ActionCell.svelte';
	import {
		locationColumnDef,
		viewColumnDef,
	} from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';

	import type { LeaseDto, PaginatedLeaseDto } from '$api/openapi';
	import type { ColumnDto } from '$lib/components/table/column-type';

	type ColumnVisibility =
		| Partial<Record<keyof LeaseDto | 'property' | 'unit', boolean>>
		| Record<string, never>; // empty object

	export let data: PaginatedLeaseDto;
	export let extraColumns: ColumnDto<LeaseDto>[] = [];
	export let columnVisibility: ColumnVisibility = {};

	const columnHelper = createColumnHelper<LeaseDto>();

	const columns = [
		columnHelper.accessor('start', {
			header: 'Start',
			cell: (info) => toUTCFormat(info.getValue()),
		}),

		columnHelper.accessor('end', {
			header: 'End',
			cell: (info) => toUTCFormat(info.getValue()),
		}),

		// Progress
		columnHelper.display({
			id: 'progress',
			header: 'Progress',
			cell: (props) => {
				const progress = getProgress(
					props.row.original.start,
					props.row.original.end,
				);

				return renderComponent(RadialProgress, {
					value: progress,
				});
			},
		}),

		columnHelper.accessor('monthlyRent', {
			header: 'Monthly Rent (KWD)',
			cell: (info) => info.getValue().toLocaleString(),
		}),

		columnHelper.accessor('deposit', {
			header: 'Deposit (KWD)',
			cell: (info) => info.getValue().toLocaleString(),
		}),

		...extraColumns,

		locationColumnDef(columnHelper),

		columnHelper.accessor('breadcrumbs.tenant', {
			id: 'tenant',
			header: 'Tenant',
			cell: (info) =>
				renderComponent(ActionCell, {
					value: info.getValue().label,
					href: getRoute({
						entity: 'tenant',
						pageType: PageType.Id,
						params: $page.params,
						id: info.getValue().id,
					}),
				}),
			enableSorting: false,
		}),

		viewColumnDef(columnHelper, 'lease', $page.params),
	];
</script>

<Table
	items={data.results}
	paginationDto={data.pagination}
	{columns}
	columnVisibility={{
		deposit: false,
		...columnVisibility,
	}}
>
	<div slot="filter" let:filters>
		<FilterBar responsive={filters}>
			<div slot="hero">
				<!-- Don't show hero if we're on the unit page -->
				{#if !('unitId' in $page.params)}
					<FilterHero title="Leases" />
				{/if}
			</div>
			<div slot="custom">
				<!-- Only show button if we're on the unit page -->
				{#if 'unitId' in $page.params}
					<FilterBarButtonForm
						getRouteOptions={{
							entity: 'lease',
						}}
					/>
				{/if}
			</div>
		</FilterBar>
	</div>
</Table>
