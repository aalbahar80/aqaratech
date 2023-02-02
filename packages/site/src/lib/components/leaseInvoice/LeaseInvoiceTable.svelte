<script lang="ts">
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';

	import { page } from '$app/stores';
	import { getLabel } from '@self/utils';

	import type { LeaseInvoiceDto, PaginatedLeaseInvoiceDto } from '$api/openapi';
	import type { ColumnDto } from '$lib/components/table/column-type';
	import type { Filter } from '$lib/models/interfaces/filter.interface';

	import L from '$i18n/i18n-svelte';
	import Badge from '$lib/components/Badge.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterBarActions from '$lib/components/filter/FilterBarActions.svelte';
	import FilterBarActionsExport from '$lib/components/filter/FilterBarActionsExport.svelte';
	import FilterBarButtonForm from '$lib/components/filter/FilterBarButtonForm.svelte';
	import { fmtCell } from '$lib/components/table/tanstack-table/columns/as-date';
	import {
		locationColumnDef,
		viewColumnDef,
	} from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { getIntlLabel } from '$lib/i18n/get-intl-label';
	import { getInvoiceBadge } from '$lib/utils/get-badge';

	export let data: PaginatedLeaseInvoiceDto;
	export let showOptions = false;
	export let extraColumns: ColumnDto<LeaseInvoiceDto>[] = [];
	export let extraFilters: Filter[] | undefined = undefined;

	const columnHelper = createColumnHelper<LeaseInvoiceDto>();

	const columns = [
		columnHelper.accessor('postAt', {
			header: getIntlLabel('postAt'),
			cell: fmtCell('date'),
		}),

		columnHelper.accessor('dueAt', {
			header: getIntlLabel('dueAt'),
			cell: fmtCell('date'),
		}),

		columnHelper.accessor('paidAt', {
			header: getIntlLabel('paidAt'),
			cell: fmtCell('date'),
		}),

		columnHelper.display({
			id: 'isPaidLate',
			header: $L.filter.isPaidLate(),
			enableSorting: false,
			cell: (info) => {
				const invoice = info.row.original;

				if (!invoice.isPaid || !invoice.paidAt || !invoice.dueAt) {
					return '';
				}

				const isPaidLate = new Date(invoice.paidAt) > new Date(invoice.dueAt);

				return renderComponent(Badge, {
					label: isPaidLate ? $L.badge.late() : $L.badge.onTime(),
					badgeColor: isPaidLate ? 'red' : 'green',
				});
			},
		}),

		columnHelper.accessor('isPaid', {
			header: getIntlLabel('isPaid'),
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

		columnHelper.accessor('mfPaymentId', {
			header: getLabel('mfPaymentId'),
		}),

		columnHelper.accessor('amount', {
			header: getIntlLabel('amount'),
			cell: fmtCell('currency'),
		}),

		locationColumnDef(columnHelper, {
			propertyColumnId: 'lease.unit.property.label',
			unitColumnId: 'lease.unit.label',
		}),

		...extraColumns,

		viewColumnDef(columnHelper, 'leaseInvoice', $page.params),
	];
</script>

<Table
	items={data.results}
	paginationDto={data.pagination}
	{columns}
	columnVisibility={{
		dueAt: false,
		paidAt: false,
		mfPaymentId: false,
	}}
>
	<div slot="filter" let:filters>
		<FilterBar responsive={[...filters, ...(extraFilters ?? [])]}>
			<div slot="custom">
				{#if showOptions}
					<FilterBarActions>
						<FilterBarActionsExport />
					</FilterBarActions>
				{/if}
				{#if $page.params['leaseId']}
					<FilterBarButtonForm
						getRouteOptions={{
							entity: 'leaseInvoice',
							predefined: {
								leaseId: $page.params['leaseId'],
							},
						}}
					/>
				{/if}
			</div>
		</FilterBar>
	</div>
</Table>
