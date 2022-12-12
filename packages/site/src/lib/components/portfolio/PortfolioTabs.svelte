<script lang="ts">
	import { page } from '$app/stores';

	import { getRoute, PageTab, PageType } from '@self/utils';

	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';

	$: baseRouteConfig = {
		entity: 'portfolio',
		id: $page.params.portfolioId!,
		params: $page.params,
	} as const;

	$: tabs = [
		{
			label: 'Info',
			href: getRoute({
				...baseRouteConfig,
				pageType: PageType.Id,
			}),
		},
		{
			label: 'Occupancy',
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Occupancy,
			}),
		},
		{
			label: 'Properties',
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Properties,
			}),
		},
		{
			label: 'Balance',
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Balance,
			}),
		},
		{
			label: 'Users',
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Roles,
			}),
		},
		{
			label: 'Files',
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Files,
			}),
		},
	];
</script>

<WideTabBar {tabs} />
