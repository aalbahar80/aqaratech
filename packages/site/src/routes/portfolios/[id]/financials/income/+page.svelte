<script lang="ts">
	import RangeSelect from '$lib/components/dashboard/RangeSelect.svelte';
	import StatisticsPane from '$lib/components/dashboard/stats/StatisticsPane.svelte';
	import Stats from '$lib/components/dashboard/stats/Stats.svelte';
	import TabBar from '$lib/components/Tabs/TabBar.svelte';
	import TabItem from '$lib/components/Tabs/TabItem.svelte';
	import { kwdFormat } from '$lib/utils/common';
	import { ChartBar, Database } from '@steeze-ui/heroicons';
	import * as R from 'remeda';
	import type { PageData } from './$types';
	import BarChart from './BarChart.svelte';
	import PieChart from './PieChart.svelte';

	export let data: PageData;

	$: sumTotal = R.sumBy(data.income.total, (x) => x.amount);
	$: sumPaid = R.sumBy(data.income.paid, (x) => x.amount);
	$: sumUnpaid = R.sumBy(data.income.unpaid, (x) => x.amount);

	const tabs = [
		{ label: 'Bar', href: 'table', icon: ChartBar },
		{ label: 'Pie', href: 'chart', icon: Database },
	];
</script>

<a href="income/table">Table</a>

<div class="inline-flex justify-end">
	<div class="w-72">
		<RangeSelect />
	</div>
</div>

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

<TabBar>
	{#each tabs as tab}
		<a href={tab.href}>
			<TabItem icon={tab.icon} current={false}>
				{tab.label}
			</TabItem>
		</a>
	{/each}
</TabBar>

<PieChart income={data.income} />

<BarChart income={data.income} />
