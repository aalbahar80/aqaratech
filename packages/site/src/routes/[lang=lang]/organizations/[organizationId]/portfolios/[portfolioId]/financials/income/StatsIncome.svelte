<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	import L from '$i18n/i18n-svelte';
	import StatisticsPane from '$lib/components/dashboard/stats/StatisticsPane.svelte';
	import Stats from '$lib/components/dashboard/stats/Stats.svelte';
	import { fmtCurrency } from '$lib/i18n/format';

	export let data: PageData;
</script>

{#if $page.route.id?.endsWith('table')}
	<Stats>
		<svelte:fragment slot="panes">
			<StatisticsPane
				primaryText={$L.general.total() + ' ' + $L.entity.leaseInvoice.plural()}
				secondaryText={$L.general.forPeriod()}
				primaryValue={fmtCurrency(data.invoices.sum ?? 0)}
			/>
		</svelte:fragment>
	</Stats>
{:else}
	<Stats>
		<svelte:fragment slot="panes">
			<StatisticsPane
				primaryText={$L.general.total() + ' ' + $L.entity.leaseInvoice.plural()}
				secondaryText={$L.general.forPeriod()}
				primaryValue={fmtCurrency(data.sumIncome.total)}
			/>
			<StatisticsPane
				primaryText={$L.general.collected()}
				secondaryText={$L.general.forPeriod()}
				primaryValue={fmtCurrency(data.sumIncome.paid)}
			/>
			<StatisticsPane
				primaryText={$L.general.uncollected()}
				secondaryText={$L.general.forPeriod()}
				primaryValue={fmtCurrency(data.sumIncome.unpaid)}
			/>
		</svelte:fragment>
	</Stats>
{/if}
