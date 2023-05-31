<script lang="ts">
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';

	import { page } from '$app/stores';
	import { getProgress } from '@self/utils';

	import type { LeaseDto, PaginatedLeaseDto } from '$api/openapi';
	import type { ColumnDto } from '$lib/components/table/column-type';
	import type { Filter } from '$lib/models/interfaces/filter.interface';

	import L from '$i18n/i18n-svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterBarButtonForm from '$lib/components/filter/FilterBarButtonForm.svelte';
	import FilterHero from '$lib/components/filter/FilterHero.svelte';
	import RadialProgress from '$lib/components/RadialProgress.svelte';
	import { fmtCell } from '$lib/components/table/tanstack-table/columns/as-date';
	import {
		locationColumnDef,
		viewColumnDef,
	} from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { getIntlLabel } from '$lib/i18n/get-intl-label';

	type ColumnVisibility =
		| Partial<Record<keyof LeaseDto | 'property' | 'unit', boolean>>
		| Record<string, never> // empty object
		| Record<string, boolean>; // id's from extraColumns

	export let data: PaginatedLeaseDto;
	export let extraColumns: ColumnDto<LeaseDto>[] = [];
	export let columnVisibility: ColumnVisibility = {};
	export let extraFilters: Filter[] | undefined = undefined;
	export let subtitle = '';

	const columnHelper = createColumnHelper<LeaseDto>();

	const columns = [
		columnHelper.accessor('start', {
			header: getIntlLabel('start'),
			cell: fmtCell('date'),
		}),

		columnHelper.accessor('end', {
			header: getIntlLabel('end'),
			cell: fmtCell('date'),
		}),

		// Progress
		columnHelper.display({
			id: 'progress',
			header: $L.other.progress(),
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
			header: getIntlLabel('monthlyRent'),
			cell: fmtCell('currency'),
		}),

		columnHelper.accessor('deposit', {
			header: getIntlLabel('deposit'),
			cell: fmtCell('currency'),
		}),

		locationColumnDef(columnHelper, {
			propertyColumnId: 'unit.property.label',
			unitColumnId: 'unit.computed.titleScore',
		}),

		...extraColumns,

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
	<div
		slot="filter"
		let:filters
	>
		<FilterBar responsive={[...filters, ...(extraFilters ?? [])]}>
			<div slot="hero">
				<!-- Don't show hero if we're on the unit page -->
				{#if !('unitId' in $page.params)}
					<FilterHero
						title={$L.entity.lease.plural()}
						{subtitle}
					/>
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
