<script lang="ts">
	import type { GroupByMonthDto } from '$api/openapi';
	import StatisticsPane from '$lib/components/dashboard/stats/StatisticsPane.svelte';
	import Stats from '$lib/components/dashboard/stats/Stats.svelte';
	import { kwdFormat } from '$lib/utils/common';
	import * as R from 'remeda';

	export let expenses: GroupByMonthDto[];

	$: sum = R.sumBy(expenses, (x) => x.amount);
</script>

<Stats title="Expenses">
	<svelte:fragment slot="panes">
		<StatisticsPane
			primaryText="Total"
			secondaryText="for period"
			primaryValue={kwdFormat(sum)}
		/>
	</svelte:fragment>
</Stats>
