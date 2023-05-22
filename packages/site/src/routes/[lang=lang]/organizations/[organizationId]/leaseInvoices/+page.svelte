<script lang="ts">
	import { createColumnHelper } from '@tanstack/svelte-table';
	import * as R from 'remeda';

	import type { PageData } from './$types';

	import type { LeaseInvoiceDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import DateFilter from '$lib/components/dashboard/filter/DateFilter.svelte';
	import StatisticsPane from '$lib/components/dashboard/stats/StatisticsPane.svelte';
	import Stats from '$lib/components/dashboard/stats/Stats.svelte';
	import DueStatusPie from '$lib/components/leaseInvoice/DueStatusPie.svelte';
	import LeaseInvoiceTable from '$lib/components/leaseInvoice/LeaseInvoiceTable.svelte';
	import PaymentStatusPie from '$lib/components/leaseInvoice/PaymentStatusPie.svelte';
	import PaymentTimePie from '$lib/components/leaseInvoice/PaymentTimePie.svelte';
	import { portfolioColumnDef } from '$lib/components/table/tanstack-table/columns/portfolio';
	import { isPaidFilter } from '$lib/components/table/tanstack-table/filters/is-paid';
	import { isPaidOnlineFilter } from '$lib/components/table/tanstack-table/filters/is-paid-online';
	import { payPhaseFilter } from '$lib/components/table/tanstack-table/filters/pay-phase';
	import { fmtCurrency } from '$lib/i18n/format';

	export let data: PageData;

	const columnHelper = createColumnHelper<LeaseInvoiceDto>();

	$: collected = R.pipe(
		data.invoices.aggregate,
		R.filter((x) => x.isPaid),
		R.sumBy((x) => x.sum.amount ?? 0),
	);

	$: uncollected = R.pipe(
		data.invoices.aggregate,
		R.filter((x) => !x.isPaid),
		R.sumBy((x) => x.sum.amount ?? 0),
	);
</script>

<div
	class="grid h-full grid-cols-2 gap-8 gap-x-2 rounded-lg bg-white p-8 shadow md:gap-8"
>
	<div class="col-span-full">
		<DateFilter />
	</div>
</div>

<Stats>
	<svelte:fragment slot="panes">
		<StatisticsPane
			primaryText={$L.general.total() + ' ' + $L.entity.leaseInvoice.plural()}
			secondaryText={$L.general.forPeriod()}
			primaryValue={fmtCurrency(data.invoices.sum ?? 0)}
		/>
		<StatisticsPane
			primaryText={$L.general.collected()}
			secondaryText={$L.general.forPeriod()}
			primaryValue={fmtCurrency(collected)}
		/>
		<StatisticsPane
			primaryText={$L.general.uncollected()}
			secondaryText={$L.general.forPeriod()}
			primaryValue={fmtCurrency(uncollected)}
		/>
	</svelte:fragment>
</Stats>

<div class="flex flex-col gap-4 sm:flex-row">
	<PaymentStatusPie aggregate={data.invoices.aggregate} />

	<PaymentTimePie aggregate={data.invoices.aggregate} />

	<DueStatusPie aggregate={data.invoices.aggregate} />
</div>

<LeaseInvoiceTable
	data={data.invoices}
	extraFilters={[$isPaidFilter, $isPaidOnlineFilter, $payPhaseFilter]}
	extraColumns={[
		portfolioColumnDef(columnHelper),
		{
			id: 'lease.tenant.fullName', // used for sorting
			header: $L.entity.tenant.singular(),
			accessorKey: 'breadcrumbs.tenant.label', // used for display
		},
	]}
/>
