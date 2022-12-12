<script lang="ts">
	import { createColumnHelper } from '@tanstack/svelte-table';

	import { page } from '$app/stores';

	import { getLabel, entity } from '@self/utils';

	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterBarButtonForm from '$lib/components/filter/FilterBarButtonForm.svelte';
	import FilterHero from '$lib/components/filter/FilterHero.svelte';
	import { viewColumnDef } from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';

	import type { PaginatedPropertyDto, PropertyDto } from '$api/openapi';

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
			<!-- Don't show hero if we're on the (tabbed) portfolio page -->
			<div slot="hero">
				{#if $page.data.user?.role?.roleType !== 'ORGADMIN'}
					<FilterHero title={entity.property.pluralCap} />
				{/if}
			</div>
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
