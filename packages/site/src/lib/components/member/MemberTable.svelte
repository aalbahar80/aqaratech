<script lang="ts">
	import type { PaginatedRoleDto, RoleDto } from '$api/openapi';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { getLabel } from '@self/utils';
	import { createColumnHelper } from '@tanstack/svelte-table';

	export let data: PaginatedRoleDto;

	const columnHelper = createColumnHelper<RoleDto>();

	const columns = [
		columnHelper.accessor('email', { header: getLabel('email') }),
	];
</script>

<Table
	items={data.results}
	paginationDto={data.pagination}
	{columns}
	paginationType="server"
/>
