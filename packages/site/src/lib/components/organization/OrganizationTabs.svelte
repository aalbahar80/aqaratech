<script lang="ts">
	import { page } from '$app/stores';

	import { getRoute, PageTab, PageType } from '@self/utils';

	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';

	$: baseRouteConfig = {
		entity: 'organization',
		id: $page.params['organizationId']!,
		params: {
			lang: $page.params['lang']!,
		},
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
			label: $page.data.tabLabels![PageTab.Roles],
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Roles,
			}),
		},
	];
</script>

<WideTabBar {tabs} />
