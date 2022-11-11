<script lang="ts">
	import Badge from '$lib/components/Badge.svelte';
	import type { PaginatedUnitDto, UnitDto } from '$api/openapi';
	import { page } from '$app/stores';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import { viewColumnDef } from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { getLabel } from '@self/utils';
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';

	export let data: PaginatedUnitDto;
	console.log({ data }, 'UnitTable.svelte ~ 11');

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
	{columns}
	items={data.results}
	itemCount={data.pagination.itemCount}
	pageCount={data.pagination.pageCount}
	pagination={{
		pageIndex: data.pagination.page - 1,
		pageSize: data.pagination.take,
	}}
	paginationType="server"
	columnVisibility={{
		floor: false,
		usage: false,
	}}
>
	<div slot="filter" let:filters>
		<FilterBar responsive={filters} />
	</div>
</Table>
