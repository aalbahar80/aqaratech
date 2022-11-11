<script lang="ts">
	import type { LeaseInvoiceDto } from '$api/openapi';
	import { page } from '$app/stores';
	import Badge from '$lib/components/Badge.svelte';
	import MenuItemChild from '$lib/components/buttons/MenuItemChild.svelte';
	import MenuItemIcon from '$lib/components/buttons/MenuItemIcon.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterRadio from '$lib/components/filter/FilterRadio.svelte';
	import {
		locationColumnDef,
		viewColumnDef,
	} from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import { getInvoiceBadge } from '$lib/utils/get-badge';
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
			cell: (props) => {
				const invoice = props.row.original;

				const badge = getInvoiceBadge({
					dueAt: invoice.dueAt,
					isPaid: invoice.isPaid,
					postAt: invoice.postAt,
				});

				return renderComponent(Badge, {
					label: badge.label,
					badgeColor: badge.color,
				});
			},
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
		<FilterBar responsive={filters}>
			<div slot="custom">
				<FilterRadio label="Options">
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
