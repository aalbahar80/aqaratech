<script lang="ts">
	import { page } from '$app/stores';
	import RangeSelect from '$lib/components/dashboard/RangeSelect.svelte';
	import TabBar from '$lib/components/Tabs/TabBar.svelte';
	import TabItem from '$lib/components/Tabs/TabItem.svelte';
	import HeroiconsPresentationChartBar from '~icons/heroicons/presentation-chart-bar';
	import HeroiconsTableCells from '~icons/heroicons/table-cells';
	import type { PageData } from './$types';
	import BarChart from './BarChart.svelte';
	import PieChart from './PieChart.svelte';
	import StatsIncome from './StatsIncome.svelte';

	export let data: PageData;

	const tabs = [
		{
			label: 'Table',
			href: `/portfolios/${$page.params.id ?? ''}/financials/income/table`,
			icon: HeroiconsTableCells,
		},
		{
			label: 'Chart',
			href: `/portfolios/${$page.params.id ?? ''}/financials/income`,
			icon: HeroiconsPresentationChartBar,
		},
	];
</script>

<div class="inline-flex justify-end">
	<div class="w-72">
		<RangeSelect />
	</div>
</div>

<StatsIncome {data} />

<TabBar>
	{#each tabs as { href, icon, label }}
		<a {href}>
			<TabItem {icon} current={$page.url.pathname === href}>
				{label}
			</TabItem>
		</a>
	{/each}
</TabBar>

<PieChart income={data.income} />

<BarChart income={data.income} />
