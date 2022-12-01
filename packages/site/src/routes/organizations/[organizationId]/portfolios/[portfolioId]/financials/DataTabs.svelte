<script lang="ts">
	import { page } from '$app/stores';
	import TabBar from '$lib/components/tabs/TabBar.svelte';
	import TabItem from '$lib/components/tabs/TabItem.svelte';
	import { getRoute, PageTypePortfolio } from '@self/utils';
	import HeroiconsPresentationChartBar from '~icons/heroicons/presentation-chart-bar';
	import HeroiconsTableCells from '~icons/heroicons/table-cells';

	export let dataType: 'Expenses' | 'Income';

	const tabs = [
		{
			label: 'Table',
			href: getRoute({
				entity: 'portfolio',
				params: $page.params,
				id: $page.params.portfolioId!,
				pageType: PageTypePortfolio[`${dataType}Table`],
			}),
			icon: HeroiconsTableCells,
		},
		{
			label: 'Chart',
			href: getRoute({
				entity: 'portfolio',
				params: $page.params,
				id: $page.params.portfolioId!,
				pageType: PageTypePortfolio[dataType],
			}),
			icon: HeroiconsPresentationChartBar,
		},
	];
</script>

<TabBar>
	{#each tabs as { href, icon, label }}
		<a {href} data-sveltekit-noscroll>
			<TabItem {icon} current={$page.url.pathname === href}>
				{label}
			</TabItem>
		</a>
	{/each}
</TabBar>
