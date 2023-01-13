<script lang="ts">
	import { page } from '$app/stores';

	import { getRoute, PageType, PageTab } from '@self/utils';

	import { RoleTypeEnum } from '$api/openapi';
	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';

	$: baseRoute = getRoute({
		entity: 'lease',
		id: $page.params['leaseId']!,
		pageType: PageType.Id,
		params: $page.params,
	});

	$: tabs = [
		{
			label: $page.data.tabLabels![PageType.Id],
			href: baseRoute,
		},
		{
			label: $page.data.tabLabels![PageTab.Invoices],
			href: `${baseRoute}/invoices`,
			roles: [RoleTypeEnum.Orgadmin, RoleTypeEnum.Portfolio],
		},
	];
</script>

<WideTabBar {tabs} />
