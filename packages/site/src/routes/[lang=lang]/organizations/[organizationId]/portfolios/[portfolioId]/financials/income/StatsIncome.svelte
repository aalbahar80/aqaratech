<script lang="ts">
	import type { PageData } from './$types';

	import L from '$i18n/i18n-svelte';
	import StatisticsPane from '$lib/components/dashboard/stats/StatisticsPane.svelte';
	import Stats from '$lib/components/dashboard/stats/Stats.svelte';
	import { kwdFormat } from '$lib/utils/common';

	export let data: PageData;
</script>

<Stats>
	<svelte:fragment slot="panes">
		<StatisticsPane
			primaryText={$L.general.total() + ' ' + $L.nav.income()}
			secondaryText={$L.general.forPeriod()}
			primaryValue={kwdFormat(data.sumIncome.total)}
		/>
		<StatisticsPane
			primaryText={$L.general.collected()}
			secondaryText={$L.general.forPeriod()}
			primaryValue={kwdFormat(data.sumIncome.paid)}
		/>
		<StatisticsPane
			primaryText={$L.general.uncollected()}
			secondaryText={$L.general.forPeriod()}
			primaryValue={kwdFormat(data.sumIncome.unpaid)}
		/>
	</svelte:fragment>
</Stats>
