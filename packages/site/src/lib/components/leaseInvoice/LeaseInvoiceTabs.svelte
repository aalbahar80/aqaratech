<script lang="ts">
	import { page } from '$app/stores';
	import { getRoute, PageType, PageTab } from '@self/utils';

	import { RoleTypeEnum } from '$api/openapi';
	import L from '$i18n/i18n-svelte';
	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';

	$: baseRoute = getRoute({
		entity: 'leaseInvoice',
		id: $page.params['leaseInvoiceId']!,
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
			roles: [RoleTypeEnum.Orgadmin, RoleTypeEnum.Portfolio],
		},
		{
			label: $L.entity.message.plural(),
			href: `${baseRoute}/messages`,
			roles: [RoleTypeEnum.Orgadmin],
		},
	];
</script>

<WideTabBar {tabs} />
