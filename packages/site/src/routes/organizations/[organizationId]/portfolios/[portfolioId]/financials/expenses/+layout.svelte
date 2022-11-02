<script lang="ts">
	import { page } from '$app/stores';
	import RangeSelect from '$lib/components/dashboard/RangeSelect.svelte';
	import TabBar from '$lib/components/Tabs/TabBar.svelte';
	import TabItem from '$lib/components/Tabs/TabItem.svelte';
	import { portfolioRoute } from '$lib/utils/route-helpers';
	import HeroiconsPresentationChartBar from '~icons/heroicons/presentation-chart-bar';
	import HeroiconsTableCells from '~icons/heroicons/table-cells';
	import type { PageData } from './$types';
	import StatsExpenses from './StatsExpenses.svelte';

	export let data: PageData;

	const tabs = [
		{
			label: 'Table',
			href: `${portfolioRoute({
				params: $page.params,
			})}/financials/expenses/table`,
			icon: HeroiconsTableCells,
		},
		{
			label: 'Chart',
			href: `${portfolioRoute({
				params: $page.params,
			})}/financials/expenses`,
			icon: HeroiconsPresentationChartBar,
		},
	];
</script>

<div class="inline-flex justify-end">
	<div class="w-72">
		<RangeSelect />
	</div>
</div>

<StatsExpenses {data} />

<TabBar>
	{#each tabs as { href, icon, label }}
		<a {href} data-sveltekit-noscroll>
			<TabItem {icon} current={$page.url.pathname === href}>
				{label}
			</TabItem>
		</a>
	{/each}
</TabBar>

<slot />
