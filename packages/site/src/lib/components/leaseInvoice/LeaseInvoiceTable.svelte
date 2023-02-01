<script lang="ts">
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';

	import { page } from '$app/stores';
	import { getLabel, toUTCFormat } from '@self/utils';

	import type { LeaseInvoiceDto, PaginatedLeaseInvoiceDto } from '$api/openapi';
	import type { ColumnDto } from '$lib/components/table/column-type';
	import type { Filter } from '$lib/models/interfaces/filter.interface';

	import Badge from '$lib/components/Badge.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterBarActions from '$lib/components/filter/FilterBarActions.svelte';
	import FilterBarActionsExport from '$lib/components/filter/FilterBarActionsExport.svelte';
	import FilterBarButtonForm from '$lib/components/filter/FilterBarButtonForm.svelte';
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
			cell: (info) => toUTCFormat(info.getValue().toLocaleString()),
		}),

		columnHelper.accessor('dueAt', {
			header: getIntlLabel('dueAt'),
			cell: (info) => {
				const val = info.getValue();
				return val ? toUTCFormat(val) : '';
			},
		}),

		columnHelper.accessor('paidAt', {
			header: getIntlLabel('paidAt'),
			cell: (info) => {
				const val = info.getValue();
				return val ? toUTCFormat(val) : '';
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
			cell: (info) => info.getValue().toLocaleString(),
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
