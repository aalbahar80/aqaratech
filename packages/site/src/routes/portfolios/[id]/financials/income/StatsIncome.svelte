<script lang="ts">
	import StatisticsPane from '$lib/components/dashboard/stats/StatisticsPane.svelte';
	import Stats from '$lib/components/dashboard/stats/Stats.svelte';
	import { kwdFormat } from '$lib/utils/common';
	import * as R from 'remeda';
	import type { PageData } from './$types';

	export let data: PageData;

	$: sumTotal = R.sumBy(data.income.total, (x) => x.amount);
	$: sumPaid = R.sumBy(data.income.paid, (x) => x.amount);
	$: sumUnpaid = R.sumBy(data.income.unpaid, (x) => x.amount);
</script>

<Stats title="Income">
	<svelte:fragment slot="panes">
		<StatisticsPane
			primaryText="Total"
			secondaryText="for period"
			primaryValue={kwdFormat(sumTotal)}
		/>
		<StatisticsPane
			primaryText="Collected"
			secondaryText="for period"
			primaryValue={kwdFormat(sumPaid)}
		/>
		<StatisticsPane
			primaryText="Uncollected"
			secondaryText="for period"
			primaryValue={kwdFormat(sumUnpaid)}
		/>
	</svelte:fragment>
</Stats>
