<script lang="ts">
	import type { PaginatedPropertyDto, PropertyDto } from '$api/openapi';
	import { page } from '$app/stores';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterBarButtonForm from '$lib/components/filter/FilterBarButtonForm.svelte';
	import { viewColumnDef } from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { getLabel } from '@self/utils';
	import { createColumnHelper } from '@tanstack/svelte-table';

	export let data: PaginatedPropertyDto;

	const columnHelper = createColumnHelper<PropertyDto>();

	const columns = [
		columnHelper.accessor('label', { header: getLabel('label') }),

		columnHelper.accessor('area', { header: getLabel('area') }),

		columnHelper.accessor('street', { header: getLabel('street') }),

		columnHelper.accessor('avenue', { header: getLabel('avenue') }),

		columnHelper.accessor('block', { header: getLabel('block') }),

		columnHelper.accessor('number', { header: getLabel('number') }),

		columnHelper.accessor('parcel', { header: getLabel('parcel') }),

		columnHelper.accessor('paci', { header: getLabel('paci') }),

		viewColumnDef(columnHelper, 'property', $page.params),
	];
</script>

<Table
	items={data.results}
	paginationDto={data.pagination}
	{columns}
	columnVisibility={{
		avenue: false,
		paci: false,
		parcel: false,
	}}
>
	<div slot="filter" let:filters>
		<FilterBar responsive={filters}>
			<div slot="custom">
				<FilterBarButtonForm
					getRouteOptions={{
						entity: 'property',
					}}
				/>
			</div>
		</FilterBar>
	</div>
</Table>
