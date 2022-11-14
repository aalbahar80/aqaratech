<script lang="ts">
	import type { PaginatedPortfolioDto, PortfolioDto } from '$api/openapi';
	import { page } from '$app/stores';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterBarButtonForm from '$lib/components/filter/FilterBarButtonForm.svelte';
	import { viewColumnDef } from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { getLabel } from '@self/utils';
	import { createColumnHelper } from '@tanstack/svelte-table';

	export let data: PaginatedPortfolioDto;

	const columnHelper = createColumnHelper<PortfolioDto>();

	const columns = [
		columnHelper.accessor('fullName', { header: getLabel('fullName') }),

		columnHelper.accessor('label', { header: getLabel('label') }),

		columnHelper.accessor('phone', { header: getLabel('phone') }),

		columnHelper.accessor('createdAt', { header: getLabel('createdAt') }),

		columnHelper.accessor('updatedAt', { header: getLabel('updatedAt') }),

		columnHelper.accessor('dob', { header: getLabel('dob') }),

		viewColumnDef(columnHelper, 'portfolio', $page.params),
	];
</script>

<Table
	items={data.results}
	paginationDto={data.pagination}
	{columns}
	paginationType="server"
	columnVisibility={{
		createdAt: false,
		updatedAt: false,
		dob: false,
	}}
>
	<div slot="filter" let:filters>
		<FilterBar responsive={filters}>
			<div slot="custom">
				<FilterBarButtonForm
					getRouteOptions={{
						entity: 'portfolio',
					}}
				/>
			</div>
		</FilterBar>
	</div>
</Table>
