<script lang="ts">
	import type { LeaseDto } from '$api/openapi';
	import { page } from '$app/stores';
	import ActionCell from '$lib/components/table/tanstack-table/ActionCell.svelte';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import { getRoute } from '$lib/utils/route-helpers/get-route';
	import { PageType } from '$lib/utils/route-helpers/route-helpers.type';
	import {
		createColumnHelper,
		renderComponent,
		type ColumnDef,
	} from '@tanstack/svelte-table';
	import type { PageData } from './$types';

	export let data: PageData;

	const columnHelper = createColumnHelper<LeaseDto>();

	const columns: ColumnDef<LeaseDto>[] = [
		{
			header: 'Start',
			footer: 'Start',
			id: 'start',
			accessorFn: (row) => toUTCFormat(row.start),
		},
		{
			header: 'End',
			footer: 'Start',
			id: 'end',
			accessorFn: (row) => toUTCFormat(row.end),
		},
		{
			header: 'Monthly Rent (KWD)',
			footer: 'Monthly Rent (KWD)',
			accessorKey: 'monthlyRent',
			cell: (info) => {
				return info.getValue<LeaseDto['monthlyRent']>().toLocaleString();
			},
		},
		{
			header: 'Deposit (KWD)',
			footer: 'Deposit (KWD)',
			accessorKey: 'deposit',
			cell: (info) => {
				return info.getValue<LeaseDto['deposit']>().toLocaleString();
			},
		},
		// {
		// 	header: 'Type',
		// 	footer: 'Type',
		// 	accessorFn: (row) => row.expenseType?.labelEn || '',
		// 	cell: (info) => info.getValue(),
		// 	enableSorting: false,
		// },
		{
			header: 'Location',
			footer: 'Location',
			columns: [
				{
					accessorFn: (row) => row.breadcrumbs.property.label,
					id: 'propertyId',
					// cell: (info) => info.getValue(),
					header: 'Property',
					footer: 'Property',
					enableSorting: false,
				},
				{
					accessorFn: (row) => row.breadcrumbs.unit.label,
					id: 'unitId',
					// cell: (info) => info.getValue(),
					header: 'Unit',
					footer: 'Unit',
					enableSorting: false,
				},
			],
		},
		columnHelper.accessor((row) => row.breadcrumbs.tenant, {
			header: 'Tenant',
			footer: 'Tenant',
			cell: (info) =>
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
			id: 'view2', // TODO rename to view
			header: '',
			footer: '',
			cell: (props) => {
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
/>
