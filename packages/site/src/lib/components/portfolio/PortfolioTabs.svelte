<script lang="ts">
	import { page } from '$app/stores';

	import { getRoute, PageTab, PageType } from '@self/utils';

	import { getTabLabels } from '$lib/components/tabs/tab-labels';
	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';

	$: baseRouteConfig = {
		entity: 'portfolio',
		id: $page.params['portfolioId']!,
		params: $page.params,
	} as const;

	const tabLabels = getTabLabels();

	$: tabs = [
		{
			label: tabLabels[PageType.Id],
			href: getRoute({
				...baseRouteConfig,
				pageType: PageType.Id,
			}),
		},
		{
			label: tabLabels[PageTab.Occupancy],
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Occupancy,
			}),
		},
		{
			label: tabLabels[PageTab.Properties],
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Properties,
			}),
		},
		{
			label: tabLabels[PageTab.Balance],
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Balance,
			}),
		},
		{
			label: tabLabels[PageTab.Roles],
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Roles,
			}),
		},
		{
			label: tabLabels[PageTab.Files],
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Files,
			}),
		},
	];
</script>

<WideTabBar {tabs} />
