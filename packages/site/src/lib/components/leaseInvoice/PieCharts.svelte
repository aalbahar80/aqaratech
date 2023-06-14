<script lang="ts">
	import * as R from 'remeda';

	import type { LeaseInvoiceAggregateDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import DueStatusPie from '$lib/components/leaseInvoice/DueStatusPie.svelte';
	import PaymentStatusPie from '$lib/components/leaseInvoice/PaymentStatusPie.svelte';
	import PaymentTimePie from '$lib/components/leaseInvoice/PaymentTimePie.svelte';
	import PieStats from '$lib/components/leaseInvoice/PieStats.svelte';
	import { fmtCurrency } from '$lib/i18n/format';

	export let aggregate: LeaseInvoiceAggregateDto[];
	export let visibility = {
		paymentStatusPie: true,
		paymentTimePie: true,
		dueStatusPie: true,
	};

	$: paid = R.pipe(
		aggregate,
		R.filter((x) => x.isPaid),
		R.sumBy((x) => x.sum.amount ?? 0),
	);

	$: unpaid = R.pipe(
		aggregate,
		R.filter((x) => !x.isPaid),
		R.sumBy((x) => x.sum.amount ?? 0),
	);
</script>

<div class="flex flex-col gap-4 sm:flex-row">
	{#if visibility.paymentStatusPie}
		<PaymentStatusPie {aggregate}>
			<PieStats
				primaryText={$L.general.total() + ' ' + $L.entity.leaseInvoice.plural()}
				secondaryText={$L.general.forPeriod()}
				primaryValue={fmtCurrency(paid + unpaid ?? 0)}
			/>
		</PaymentStatusPie>
	{/if}

	{#if visibility.paymentTimePie}
		<PaymentTimePie {aggregate}>
			<PieStats
				primaryText={$L.general.collected()}
				secondaryText={$L.general.forPeriod()}
				primaryValue={fmtCurrency(paid)}
			/>
		</PaymentTimePie>
	{/if}

	{#if visibility.dueStatusPie}
		<DueStatusPie {aggregate}>
			<PieStats
				primaryText={$L.general.uncollected()}
				secondaryText={$L.general.forPeriod()}
				primaryValue={fmtCurrency(unpaid)}
			/>
		</DueStatusPie>
	{/if}
</div>
