<script lang="ts">
	import type { PaginatedUnitDto, UnitDto } from '$api/openapi';
	import { page } from '$app/stores';
	import Badge from '$lib/components/Badge.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterBarButtonForm from '$lib/components/filter/FilterBarButtonForm.svelte';
	import { viewColumnDef } from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { getLabel } from '@self/utils';
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';

	export let data: PaginatedUnitDto;

	const columnHelper = createColumnHelper<UnitDto>();

	const columns = [
		columnHelper.accessor('type', { header: getLabel('type') }),

		columnHelper.accessor('unitNumber', { header: getLabel('unitNumber') }),

		columnHelper.accessor('label', { header: getLabel('label') }),

		columnHelper.accessor('floor', { header: getLabel('floor') }),

		columnHelper.accessor('bed', { header: getLabel('bed') }),

		columnHelper.accessor('bath', { header: getLabel('bath') }),

		columnHelper.accessor('size', { header: getLabel('size') }),

		columnHelper.accessor('usage', { header: getLabel('usage') }),

		columnHelper.accessor('propertyId', {
			header: getLabel('property'),
			cell: (info) => info.row.original.breadcrumbs.property.label,
		}),

		columnHelper.display({
			id: 'vacancy',
			header: '',
			cell: (props) => {
				const unit = props.row.original;
				const isVacant = unit.vacancy.isVacant;
				return renderComponent(Badge, {
					label: isVacant ? 'Vacant' : 'Occupied',
					badgeColor: isVacant ? 'green' : 'yellow',
				});
			},
		}),

		viewColumnDef(columnHelper, 'unit', $page.params),
	];
</script>

<Table
	items={data.results}
	paginationDto={data.pagination}
	{columns}
	columnVisibility={{
		floor: false,
		usage: false,
	}}
>
	<div slot="filter" let:filters>
		<FilterBar responsive={filters}>
			<div slot="custom">
				<FilterBarButtonForm
					getRouteOptions={{
						entity: 'unit',
					}}
				/>
			</div>
		</FilterBar>
	</div>
</Table>
