<script lang="ts">
	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';
	import { page } from '$app/stores';
	import { getRoute, PageTypePortfolio } from '@self/utils';
	import HeroiconsPresentationChartBar from '~icons/heroicons/presentation-chart-bar';
	import HeroiconsTableCells from '~icons/heroicons/table-cells';

	export let dataType: 'Expenses' | 'Income';

	const tabs = [
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
	];
</script>

<div class="py-8">
	<WideTabBar {tabs} />
</div>
