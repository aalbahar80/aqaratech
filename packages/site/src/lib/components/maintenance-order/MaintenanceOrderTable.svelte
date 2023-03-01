<script lang="ts">
	import {
		createColumnHelper,
		renderComponent,
		type ColumnDef,
	} from '@tanstack/svelte-table';

	import { page } from '$app/stores';

	import type {
		MaintenanceOrderDto,
		PaginatedMaintenanceOrderDto,
	} from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import Badge from '$lib/components/Badge.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterBarButtonForm from '$lib/components/filter/FilterBarButtonForm.svelte';
	import FilterHero from '$lib/components/filter/FilterHero.svelte';
	import { fmtCell } from '$lib/components/table/tanstack-table/columns/as-date';
	import {
		locationColumnDef,
		viewColumnDef,
	} from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { getIntlLabel } from '$lib/i18n/get-intl-label';
	import { getMaintenanceOrderBadge } from '$lib/utils/get-badge';

	// type ColumnVisibility = ComponentProps<
	// 	Table<MaintenanceOrderDto, Record<keyof MaintenanceOrderDto, boolean>>
	// >['columnVisibility'];

	type ColumnVisibility =
		| Partial<Record<keyof MaintenanceOrderDto | 'property' | 'unit', boolean>>
		| Record<string, never>; // empty object

	export let data: PaginatedMaintenanceOrderDto;
	export let extraColumns: ColumnDef<MaintenanceOrderDto, string>[] = [];
	export let columnVisibility: ColumnVisibility = {};

	const columnHelper = createColumnHelper<MaintenanceOrderDto>();

	const columns = [
		columnHelper.accessor('title', {
			header: getIntlLabel('title'),
			cell: (props) =>
				// trim title and use ellipsis
				props.row.original.title
					? props.row.original.title.slice(0, 20) + '...'
					: '',
		}),

		columnHelper.accessor('completedAt', {
			header: getIntlLabel('completedAt'),
			cell: fmtCell('date'),
		}),

		columnHelper.accessor('status', {
			header: getIntlLabel('status'),
			cell: (props) => {
				const status = props.row.original.status;

				const badge = getMaintenanceOrderBadge(status);

				return renderComponent(Badge, {
					label: badge.label,
					badgeColor: badge.color,
				});
			},
		}),

		...extraColumns,

		locationColumnDef(columnHelper, {
			propertyColumnId: 'property.label',
			unitColumnId: 'unit.label',
		}),

		viewColumnDef(columnHelper, 'maintenanceOrder', $page.params),
	];
</script>

<Table
	items={data.results}
	paginationDto={data.pagination}
	{columns}
	{columnVisibility}
>
	<div slot="filter" let:filters>
		<FilterBar responsive={filters}>
			<div slot="hero">
				<!-- Don't show hero if we're on the property/unit pages -->
				{#if !('unitId' in $page.params) && !('propertyId' in $page.params)}
					<FilterHero title={$L.entity.maintenanceOrder.plural()} />
				{/if}
			</div>
			<div slot="custom">
				<!-- Only show button if we're on the property/unit pages -->
				{#if 'unitId' in $page.params || 'propertyId' in $page.params}
					<FilterBarButtonForm
						getRouteOptions={{
							entity: 'maintenanceOrder',
						}}
					/>
				{/if}
			</div>
		</FilterBar>
	</div>
</Table>
