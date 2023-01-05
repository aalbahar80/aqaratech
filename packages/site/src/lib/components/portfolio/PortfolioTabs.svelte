<script lang="ts">
	import { page } from '$app/stores';

	import { getRoute, PageTab, PageType } from '@self/utils';

	// eslint-disable-next-line import/no-named-as-default
	import LL from '$i18n/i18n-svelte';
	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';

	$: baseRouteConfig = {
		entity: 'portfolio',
		id: $page.params['portfolioId']!,
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
			label: $LL.nav.occupancy(),
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Occupancy,
			}),
		},
		{
			label: $LL.entity.property.plural(),
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
			label: $LL.entity.file.plural(),
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Files,
			}),
		},
	];
</script>

<WideTabBar {tabs} />
