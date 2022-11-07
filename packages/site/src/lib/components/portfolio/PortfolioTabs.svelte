<script lang="ts">
	import { page } from '$app/stores';
	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';
	import { getRoute, PageTab } from '@self/utils';

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
				pageType: PageTab.Details,
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
			label: 'Files',
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Files,
			}),
		},
	];
</script>

<WideTabBar {tabs} />
