<script lang="ts">
	import type { LeaseInvoiceDto } from '$api/openapi';
	import { page } from '$app/stores';
	import ExportButton from '$lib/components/buttons/ExportButton.svelte';
	import GenericCellSvelte from '$lib/components/table/lease-invoices/GenericCell.svelte';
	import ActionCell from '$lib/components/table/tanstack-table/ActionCell.svelte';
	import { locationColumnDef } from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import { getRoute } from '$lib/utils/route-helpers/get-route';
	import { PageType } from '$lib/utils/route-helpers/route-helpers.type';
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';
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

		columnHelper.display({
			id: 'view',
			header: '',
			footer: '',
			cell: (props) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				return renderComponent(ActionCell, {
					value: 'view',
					href: getRoute({
						entity: 'leaseInvoice',
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
	<div slot="header-actions">
		<a href={`${$page.url.pathname}/csv`} download="leaseInvoices.csv">
			<ExportButton />
		</a>
	</div>
</Table>
