<script lang="ts">
	import { createColumnHelper } from '@tanstack/svelte-table';

	import { page } from '$app/stores';

	import L from '$i18n/i18n-svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterBarButtonForm from '$lib/components/filter/FilterBarButtonForm.svelte';
	import FilterHero from '$lib/components/filter/FilterHero.svelte';
	import { viewColumnDef } from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { getIntlLabel } from '$lib/i18n/get-intl-label';

	import type { PaginatedTenantDto, TenantDto } from '$api/openapi';

	export let data: PaginatedTenantDto;

	const columnHelper = createColumnHelper<TenantDto>();

	const columns = [
		columnHelper.accessor('fullName', { header: getIntlLabel('fullName') }),

		columnHelper.accessor('label', { header: getIntlLabel('label') }),

		columnHelper.accessor('phone', { header: getIntlLabel('phone') }),

		columnHelper.accessor('nationality', {
			header: getIntlLabel('nationality'),
		}),

		columnHelper.accessor('createdAt', { header: getIntlLabel('createdAt') }),

		columnHelper.accessor('updatedAt', { header: getIntlLabel('updatedAt') }),

		columnHelper.accessor('dob', { header: getIntlLabel('dob') }),

		columnHelper.accessor('residencyEnd', {
			header: getIntlLabel('residencyEnd'),
		}),

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
				<FilterHero title={$L.entity.tenant.plural()} />
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
