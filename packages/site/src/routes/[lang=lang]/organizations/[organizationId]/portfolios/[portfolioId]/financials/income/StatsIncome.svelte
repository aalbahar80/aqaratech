<script lang="ts">
	import type { PageData } from './$types';

	import L from '$i18n/i18n-svelte';
	import StatisticsPane from '$lib/components/dashboard/stats/StatisticsPane.svelte';
	import Stats from '$lib/components/dashboard/stats/Stats.svelte';
	import { fmtCurrency } from '$lib/i18n/format';

	export let data: PageData;
</script>

<Stats>
	<svelte:fragment slot="panes">
		<StatisticsPane
			primaryText={$L.general.total() + ' ' + $L.entity.leaseInvoice.plural()}
			secondaryText={$L.general.forPeriod()}
			primaryValue={fmtCurrency(data.invoices.sum ?? 0)}
		/>
	</svelte:fragment>
</Stats>
