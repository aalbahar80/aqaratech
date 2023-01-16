<script lang="ts">
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';

	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { toUTCFormat } from '@self/utils';

	import type { LeaseInvoiceDto, PaginatedLeaseInvoiceDto } from '$api/openapi';
	import type { ColumnDto } from '$lib/components/table/column-type';

	import { createApi } from '$api';
	import { handleApiError } from '$api/handle-api-error';
	import L from '$i18n/i18n-svelte';
	import Badge from '$lib/components/Badge.svelte';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import FilterBarActions from '$lib/components/filter/FilterBarActions.svelte';
	import FilterBarActionsExport from '$lib/components/filter/FilterBarActionsExport.svelte';
	import FilterBarButtonForm from '$lib/components/filter/FilterBarButtonForm.svelte';
	import ActionButton from '$lib/components/table/tanstack-table/ActionButton.svelte';
	import {
		locationColumnDef,
		viewColumnDef,
	} from '$lib/components/table/tanstack-table/columns/common-column-defs';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { getIntlLabel } from '$lib/i18n/get-intl-label';
	import { addSuccessToast } from '$lib/stores/toast';
	import { getInvoiceBadge } from '$lib/utils/get-badge';

	export let data: PaginatedLeaseInvoiceDto;
	export let showOptions = false;
	export let extraColumns: ColumnDto<LeaseInvoiceDto>[] = [];

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

		columnHelper.accessor('amount', {
			header: getIntlLabel('amount'),
			cell: (info) => info.getValue().toLocaleString(),
		}),

		locationColumnDef(columnHelper),

		...extraColumns,

		viewColumnDef(columnHelper, 'leaseInvoice', $page.params),
	];

	const adminColumns = [
		columnHelper.display({
			id: 'markAsPaid',
			header: $L.buttons.markAsPaid(),
			cell: (props) => {
				const invoice = props.row.original;

				return renderComponent(ActionButton, {
					options: {
						label: $L.buttons.markAsPaid(),
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
		<FilterBar
			responsive={[
				...filters,
				// TODO: Hide in tenant portal
				// TODO: Set input type to radio
				$isPaidFilter,
			]}
		>
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
