<script lang="ts">
	import { page } from '$app/stores';
	import { getRoute, PageTab, PageType } from '@self/utils';

	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';

	$: baseRouteConfig = {
		entity: 'portfolio',
		id: $page.params['portfolioId']!,
		params: $page.params,
	} as const;

	$: tabs = [
		{
			label: $page.data.tabLabels![PageType.Id],
			href: getRoute({
				...baseRouteConfig,
				pageType: PageType.Id,
			}),
		},
		{
			label: $page.data.tabLabels![PageTab.Occupancy],
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Occupancy,
			}),
		},
		{
			label: $page.data.tabLabels![PageTab.Properties],
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Properties,
			}),
		},
		{
			label: $page.data.tabLabels![PageTab.Balance],
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Balance,
			}),
		},
		{
			label: $page.data.tabLabels![PageTab.Roles],
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Roles,
			}),
		},
		{
			label: $page.data.tabLabels![PageTab.Files],
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Files,
			}),
		},
	];
</script>

<WideTabBar {tabs} />
