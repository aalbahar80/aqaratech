<script lang="ts">
	import StatisticsPane from '$lib/components/dashboard/stats/StatisticsPane.svelte';
	import Stats from '$lib/components/dashboard/stats/Stats.svelte';
	import { kwdFormat } from '$lib/utils/common';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Stats>
	<svelte:fragment slot="panes">
		<StatisticsPane
			primaryText="Total Income"
			secondaryText="for period"
			primaryValue={kwdFormat(data.sumIncome.total)}
		/>
		<StatisticsPane
			primaryText="Collected"
			secondaryText="for period"
			primaryValue={kwdFormat(data.sumIncome.paid)}
		/>
		<StatisticsPane
			primaryText="Uncollected"
			secondaryText="for period"
			primaryValue={kwdFormat(data.sumIncome.unpaid)}
		/>
	</svelte:fragment>
</Stats>
