<script lang="ts">
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';

	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	import { toUTCFormat } from '@self/utils';

	import Badge from '$lib/components/Badge.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterBarActions from '$lib/components/filter/FilterBarActions.svelte';
	import FilterBarActionsExport from '$lib/components/filter/FilterBarActionsExport.svelte';
	import FilterBarButtonForm from '$lib/components/filter/FilterBarButtonForm.svelte';
	import type { ColumnDto } from '$lib/components/table/column-type';
	import ActionButton from '$lib/components/table/tanstack-table/ActionButton.svelte';
	import {
		locationColumnDef,
		viewColumnDef,
	} from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { addSuccessToast } from '$lib/stores/toast';
	import { getInvoiceBadge } from '$lib/utils/get-badge';

	import type { LeaseInvoiceDto, PaginatedLeaseInvoiceDto } from '$api/openapi';

	import { createApi } from '$api';
	import { handleApiError } from '$api/handle-api-error';

	export let data: PaginatedLeaseInvoiceDto;
	export let showOptions = false;
	export let extraColumns: ColumnDto<LeaseInvoiceDto>[] = [];

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

		...extraColumns,

		viewColumnDef(columnHelper, 'leaseInvoice', $page.params),
	];

	const adminColumns = [
		columnHelper.display({
			id: 'markAsPaid',
			header: '',
			cell: (props) => {
				const invoice = props.row.original;

				return renderComponent(ActionButton, {
					options: {
						label: 'Mark as Paid',
						disabled: invoice.isPaid,
						onClick: async () => {
							try {
								await createApi().leaseInvoices.update({
									id: invoice.id,
									updateLeaseInvoiceDto: {
										isPaid: !invoice.isPaid,
										paidAt: invoice.isPaid
											? null
											: new Date().toISOString().substring(0, 10),
									},
								});
								addSuccessToast();
								await invalidateAll();
							} catch (e) {
								console.error(e);
								await handleApiError(e);
							}
						},
					},
				});
			},
		}),
	];
</script>

<Table
	items={data.results}
	paginationDto={data.pagination}
	columns={$page.data.user?.role?.roleType === 'ORGADMIN'
		? [...columns, ...adminColumns]
		: columns}
	columnVisibility={{
		dueAt: false,
		paidAt: false,
	}}
>
	<div slot="filter" let:filters>
		<FilterBar responsive={filters}>
			<div slot="custom">
				{#if showOptions}
					<FilterBarActions>
						<FilterBarActionsExport />
					</FilterBarActions>
				{/if}
				{#if $page.params.leaseId}
					<FilterBarButtonForm
						getRouteOptions={{
							entity: 'leaseInvoice',
							predefined: {
								leaseId: $page.params.leaseId,
							},
						}}
					/>
				{/if}
			</div>
		</FilterBar>
	</div>
</Table>
