<script lang="ts">
	import type { PaginatedTenantDto, TenantDto } from '$api/openapi';
	import { page } from '$app/stores';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import { viewColumnDef } from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { getLabel } from '@self/utils';
	import { createColumnHelper } from '@tanstack/svelte-table';

	export let data: PaginatedTenantDto;

	const columnHelper = createColumnHelper<TenantDto>();

	const columns = [
		columnHelper.accessor('fullName', { header: getLabel('fullName') }),

		columnHelper.accessor('label', { header: getLabel('label') }),

		columnHelper.accessor('phone', { header: getLabel('phone') }),

		columnHelper.accessor('nationality', { header: getLabel('nationality') }),

		columnHelper.accessor('createdAt', { header: getLabel('createdAt') }),

		columnHelper.accessor('updatedAt', { header: getLabel('updatedAt') }),

		columnHelper.accessor('dob', { header: getLabel('dob') }),

		columnHelper.accessor('residencyEnd', { header: getLabel('residencyEnd') }),

		viewColumnDef(columnHelper, 'tenant', $page.params),
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
		residencyEnd: false,
	}}
>
	<div slot="filter" let:filters>
		<FilterBar responsive={filters} />
	</div>
</Table>
