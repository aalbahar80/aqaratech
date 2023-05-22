<script lang="ts">
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';

	import { page } from '$app/stores';
	import { getMyfatoorahReceipt } from '@self/utils';

	import type { LeaseInvoiceDto, PaginatedLeaseInvoiceDto } from '$api/openapi';
	import type { ColumnDto } from '$lib/components/table/column-type';
	import type { Filter } from '$lib/models/interfaces/filter.interface';

	import L from '$i18n/i18n-svelte';
	import Badge from '$lib/components/Badge.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterBarActions from '$lib/components/filter/FilterBarActions.svelte';
	import FilterBarActionsExport from '$lib/components/filter/FilterBarActionsExport.svelte';
	import FilterBarButtonForm from '$lib/components/filter/FilterBarButtonForm.svelte';
	import { getUnpaidBadge } from '$lib/components/leaseInvoice/badge';
	import ActionCell from '$lib/components/table/tanstack-table/ActionCell.svelte';
	import { fmtCell } from '$lib/components/table/tanstack-table/columns/as-date';
	import {
		locationColumnDef,
		viewColumnDef,
	} from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { environment } from '$lib/environment';
	import { getIntlLabel } from '$lib/i18n/get-intl-label';
	import { getInvoiceBadge } from '$lib/utils/get-badge';

	export let data: PaginatedLeaseInvoiceDto;
	export let showOptions = false;
	export let extraColumns: ColumnDto<LeaseInvoiceDto>[] = [];
	export let extraFilters: Filter[] | undefined = undefined;

	const columnHelper = createColumnHelper<LeaseInvoiceDto>();

	const columns = [
		columnHelper.accessor('id', {
			header: getIntlLabel('id'),
		}),

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
			id: 'payPhase',
			header: $L.filter.payPhase(),
			enableSorting: false,
			cell: (info) => {
				const invoice = info.row.original;

				if (invoice.isPaid && !invoice.paidAt) {
					return '';
				}

				if (!invoice.isPaid && !invoice.dueAt) {
					return '';
				}

				let label: string;
				let badgeColor;

				// NOTE: Client requested to show payment status in "Payment Time" column,
				// for unpaid invoices.
				if (!invoice.isPaid) {
					const unpaid = getUnpaidBadge(invoice);
					return renderComponent(Badge, {
						label: unpaid.label,
						badgeColor: unpaid.color,
					});
				}

				// Typing purposes only. These cases have been handled above.
				if (!invoice.paidAt || !invoice.dueAt) {
					return '';
				}

				if (new Date(invoice.paidAt) > new Date(invoice.dueAt)) {
					label = $L.badge.late();
					badgeColor = 'red';
				} else if (
					new Date(invoice.paidAt) <= new Date(invoice.dueAt) &&
					new Date(invoice.paidAt) >= new Date(invoice.postAt)
				) {
					label = $L.badge.onTime();
					badgeColor = 'green';
				} else {
					label = $L.badge.advanced();
					badgeColor = 'green';
				}

				return renderComponent(Badge, {
					label,
					badgeColor,
				});
			},
		}),

		columnHelper.accessor('isPaid', {
			header: getIntlLabel('isPaid', false),
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
			header: getIntlLabel('mfPaymentId'),
			cell: (props) => {
				const paymentId = props.cell.getValue();

				if (!paymentId) {
					return '';
				}

				return renderComponent(ActionCell, {
					value: paymentId,
					href: getMyfatoorahReceipt({
						paymentId,
						myfatoorahURL: environment.PUBLIC_MYFATOORAH_SITE_URL,
					}),
				});
			},
		}),

		columnHelper.accessor('amount', {
			header: getIntlLabel('amount'),
			cell: fmtCell('currency'),
		}),

		locationColumnDef(columnHelper, {
			propertyColumnId: 'lease.unit.property.label',
			unitColumnId: 'lease.unit.computed.titleScore',
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
		id: false,
		dueAt: false,
		paidAt: false,
		mfPaymentId: false,
		'portfolio.fullName': false,
	}}
>
	<div
		slot="filter"
		let:filters
	>
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
