<script lang="ts">
	import { page } from '$app/stores';
	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';
	import { getRoute, PageTab, PageType } from '@self/utils';

	$: baseRouteConfig = {
		entity: 'organization',
		id: $page.params.organizationId!,
		params: {},
	} as const;

	$: tabs = [
		{
			label: 'Info',
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Settings,
			}),
		},
		{
			label: 'Users',
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Roles,
			}),
		},
	];
</script>

<WideTabBar {tabs} />
