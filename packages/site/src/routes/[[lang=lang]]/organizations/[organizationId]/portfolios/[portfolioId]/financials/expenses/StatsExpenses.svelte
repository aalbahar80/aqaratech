<script lang="ts">
	import * as R from 'remeda';

	import StatisticsPane from '$lib/components/dashboard/stats/StatisticsPane.svelte';
	import Stats from '$lib/components/dashboard/stats/Stats.svelte';
	import { kwdFormat } from '$lib/utils/common';

	import type { GroupByMonthDto } from '$api/openapi';

	export let expenses: GroupByMonthDto[];

	$: sum = R.sumBy(expenses, (x) => x.amount);
</script>

<Stats>
	<svelte:fragment slot="panes">
		<StatisticsPane
			primaryText="Total Expenses"
			secondaryText="for period"
			primaryValue={kwdFormat(sum)}
		/>
	</svelte:fragment>
</Stats>
