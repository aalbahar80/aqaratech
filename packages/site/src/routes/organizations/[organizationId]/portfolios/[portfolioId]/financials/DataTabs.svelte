<script lang="ts">
	import { page } from '$app/stores';
	import TabBar from '$lib/components/Tabs/TabBar.svelte';
	import TabItem from '$lib/components/Tabs/TabItem.svelte';
	import { getRoute } from '$lib/utils/route-helpers/get-route';
	import { PageTypePortfolio } from '$lib/utils/route-helpers/route-helpers.type';
	import HeroiconsPresentationChartBar from '~icons/heroicons/presentation-chart-bar';
	import HeroiconsTableCells from '~icons/heroicons/table-cells';

	export let dataType: 'Expenses' | 'Income';

	const tabs = [
		{
			label: 'Table',
			href:
				getRoute({
					entity: 'portfolio',
					params: $page.params,
					id: $page.params.portfolioId!,
					pageType: PageTypePortfolio[dataType],
				}) + '/table',
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
