<script lang="ts">
	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';
	import { getRoute, PageTab, PageType } from '@self/utils';

	import { page } from '$app/stores';

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
				pageType: PageType.Id,
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
