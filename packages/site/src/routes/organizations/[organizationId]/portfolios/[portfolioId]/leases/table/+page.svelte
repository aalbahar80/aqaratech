<script lang="ts">
	import type { LeaseDto } from '$api/openapi';
	import { page } from '$app/stores';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterHero from '$lib/components/filter/FilterHero.svelte';
	import ActionCell from '$lib/components/table/tanstack-table/ActionCell.svelte';
	import { locationColumnDef } from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import { getRoute } from '$lib/utils/route-helpers/get-route';
	import { PageType } from '$lib/utils/route-helpers/route-helpers.type';
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';
	import type { PageData } from './$types';

	export let data: PageData;

	const columnHelper = createColumnHelper<LeaseDto>();

	const columns = [
		columnHelper.accessor('start', {
			header: 'Start',
			cell: (info) => toUTCFormat(info.getValue()),
		}),

		columnHelper.accessor('end', {
			header: 'End',
			cell: (info) => toUTCFormat(info.getValue()),
		}),

		columnHelper.accessor('monthlyRent', {
			header: 'Monthly Rent (KWD)',
			cell: (info) => info.getValue().toLocaleString(),
		}),

		columnHelper.accessor('deposit', {
			header: 'Deposit (KWD)',
			cell: (info) => info.getValue().toLocaleString(),
		}),

		locationColumnDef(columnHelper),

		columnHelper.accessor('breadcrumbs.tenant', {
			id: 'tenant',
			header: 'Tenant',
			cell: (info) =>
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				renderComponent(ActionCell, {
					value: info.getValue().label,
					href: getRoute({
						entity: 'tenant',
						pageType: PageType.Id,
						params: $page.params,
						id: info.getValue().id,
					}),
				}),
			enableSorting: false,
		}),

		columnHelper.display({
			id: 'view',
			header: '',
			footer: '',
			cell: (props) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				return renderComponent(ActionCell, {
					value: 'view',
					href: getRoute({
						entity: 'lease',
						id: props.row.original.id,
						pageType: PageType.Id,
						params: $page.params,
					}),
				});
			},
		}),
	];
</script>

<Table
	{columns}
	items={data.leases.results}
	itemCount={data.leases.pagination.itemCount}
	pageCount={data.leases.pagination.pageCount}
	pagination={{
		pageIndex: data.leases.pagination.page - 1,
		pageSize: data.leases.pagination.take,
	}}
	paginationType="server"
	columnVisibility={{
		deposit: false,
	}}
>
	<div slot="filter" let:filters>
		<FilterBar responsive={filters}>
			<div slot="hero">
				<FilterHero title="Leases" subtitle="" />
			</div>
		</FilterBar>
	</div>
</Table>
