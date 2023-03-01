<script lang="ts">
	import { page } from '$app/stores';
	import { getRoute, PageType, PageTab } from '@self/utils';

	import { RoleTypeEnum } from '$api/openapi';
	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';

	$: baseRoute = getRoute({
		entity: 'maintenanceOrder',
		id: $page.params['maintenanceOrderId']!,
		pageType: PageType.Id,
		params: $page.params,
	});

	$: tabs = [
		{
			label: $page.data.tabLabels![PageType.Id],
			href: baseRoute,
		},
		{
			label: $page.data.tabLabels![PageTab.Files],
			href: `${baseRoute}/files`,
			roles: [
				RoleTypeEnum.Orgadmin,
				RoleTypeEnum.Portfolio,
				RoleTypeEnum.Tenant,
			],
		},
	];
</script>

<WideTabBar {tabs} />
