<script lang="ts">
	import * as R from 'remeda';

	import L from '$i18n/i18n-svelte';
	import StatisticsPane from '$lib/components/dashboard/stats/StatisticsPane.svelte';
	import Stats from '$lib/components/dashboard/stats/Stats.svelte';
	import { fmtCurrency } from '$lib/i18n/format';

	import type { GroupByMonthDto } from '$api/openapi';

	export let expenses: GroupByMonthDto[];

	$: sum = R.sumBy(expenses, (x) => x.amount);
</script>

<Stats>
	<svelte:fragment slot="panes">
		<StatisticsPane
			primaryText={$L.general.total() + ' ' + $L.entity.expense.plural()}
			secondaryText={$L.general.forPeriod()}
			primaryValue={fmtCurrency(sum)}
		/>
	</svelte:fragment>
</Stats>
