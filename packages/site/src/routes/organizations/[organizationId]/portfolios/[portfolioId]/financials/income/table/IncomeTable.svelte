<script lang="ts">
	import type { LeaseInvoiceDto } from '$api/openapi';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import MenuItemChild from '$lib/components/buttons/MenuItemChild.svelte';
	import MenuItemIcon from '$lib/components/buttons/MenuItemIcon.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterRadio from '$lib/components/filter/FilterRadio.svelte';
	import GenericCellSvelte from '$lib/components/table/lease-invoices/GenericCell.svelte';
	import {
		locationColumnDef,
		viewColumnDef,
	} from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import { MenuItem } from '@rgossiaux/svelte-headlessui';
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';
	import Fa6SolidFileCsv from '~icons/fa6-solid/file-csv';
	import type { PageData } from './$types';

	export let data: PageData;

	const columnHelper = createColumnHelper<LeaseInvoiceDto>();

	const columns = [
		columnHelper.accessor('postAt', {
			header: 'Post Date',
			cell: (info) => toUTCFormat(info.getValue().toLocaleString()),
		}),

		columnHelper.accessor('dueAt', {
			header: 'Due Date',
			cell: (info) => {
				const val = info.getValue();
				return val ? toUTCFormat(val) : '';
			},
		}),

		columnHelper.accessor('paidAt', {
			header: 'Paid Date',
			cell: (info) => {
				const val = info.getValue();
				return val ? toUTCFormat(val) : '';
			},
		}),

		columnHelper.accessor('isPaid', {
			header: 'Paid',
			cell: (info) =>
				renderComponent(GenericCellSvelte, {
					value: info.getValue() ? 'Paid' : 'Unpaid',
					classes: info.getValue() ? 'text-green-600' : 'text-red-600',
				}),
		}),

		columnHelper.accessor('amount', {
			header: 'Amount (KWD)',
			cell: (info) => info.getValue().toLocaleString(),
		}),

		locationColumnDef(columnHelper),

		viewColumnDef(columnHelper, 'leaseInvoice', $page.params),
	];
</script>

<Table
	{columns}
	items={data.invoices.results}
	itemCount={data.invoices.pagination.itemCount}
	pageCount={data.invoices.pagination.pageCount}
	pagination={{
		pageIndex: data.invoices.pagination.page - 1,
		pageSize: data.invoices.pagination.take,
	}}
	paginationType="server"
	columnVisibility={{
		dueAt: false,
		paidAt: false,
	}}
>
	<div slot="filter" let:filters>
		<FilterBar
			responsive={filters}
			persistent={[
				{
					id: 'options',
					label: 'Options',
					options: [
						{
							label: 'Export to CSV',
							value: 'export-csv',
							active: true,
							action: () => {
								void goto(`${$page.url.pathname}/csv`);
							},
						},
					],
				},
			]}
		>
			<div slot="custom">
				<FilterRadio>
					<MenuItem as="div" let:active>
						<a href={`${$page.url.pathname}/csv`} download="leaseInvoices.csv">
							<MenuItemChild {active}>
								<MenuItemIcon icon={Fa6SolidFileCsv} />
								Export to CSV
							</MenuItemChild>
						</a>
					</MenuItem>
				</FilterRadio>
			</div>
		</FilterBar>
	</div>
</Table>
