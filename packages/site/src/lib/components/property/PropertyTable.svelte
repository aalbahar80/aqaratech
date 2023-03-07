<script lang="ts">
	import { createColumnHelper } from '@tanstack/svelte-table';

	import { page } from '$app/stores';

	import type { PaginatedPropertyDto, PropertyDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterBarButtonForm from '$lib/components/filter/FilterBarButtonForm.svelte';
	import FilterHero from '$lib/components/filter/FilterHero.svelte';
	import { viewColumnDef } from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { getIntlLabel } from '$lib/i18n/get-intl-label';

	export let data: PaginatedPropertyDto;

	const columnHelper = createColumnHelper<PropertyDto>();

	const columns = [
		columnHelper.accessor('label', { header: getIntlLabel('label') }),

		columnHelper.accessor('area', { header: getIntlLabel('area') }),

		columnHelper.accessor('street', { header: getIntlLabel('street') }),

		columnHelper.accessor('avenue', { header: getIntlLabel('avenue') }),

		columnHelper.accessor('block', { header: getIntlLabel('block') }),

		columnHelper.accessor('number', { header: getIntlLabel('number') }),

		columnHelper.accessor('parcel', { header: getIntlLabel('parcel') }),

		columnHelper.accessor('paci', { header: getIntlLabel('paci') }),

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
	<div
		slot="filter"
		let:filters
	>
		<FilterBar responsive={filters}>
			<!-- Don't show hero if we're on the (tabbed) portfolio page -->
			<div slot="hero">
				{#if $page.data.user?.role?.roleType !== 'ORGADMIN'}
					<FilterHero title={$L.entity.property.plural()} />
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
