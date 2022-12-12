<script lang="ts">
	import { createColumnHelper } from '@tanstack/svelte-table';

	import { page } from '$app/stores';

	import { entity, getLabel } from '@self/utils';

	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterBarButtonForm from '$lib/components/filter/FilterBarButtonForm.svelte';
	import FilterHero from '$lib/components/filter/FilterHero.svelte';
	import { viewColumnDef } from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';

	import type { PaginatedTenantDto, TenantDto } from '$api/openapi';

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
	columnVisibility={{
		createdAt: false,
		updatedAt: false,
		dob: false,
		residencyEnd: false,
	}}
>
	<div slot="filter" let:filters>
		<FilterBar responsive={filters}>
			<div slot="hero">
				<FilterHero title={entity.tenant.pluralCap} />
			</div>
			<div slot="custom">
				<FilterBarButtonForm
					getRouteOptions={{
						entity: 'tenant',
					}}
				/>
			</div>
		</FilterBar>
	</div>
</Table>
