<script lang="ts">
	import { page } from '$app/stores';

	import { getRoute, PageType } from '@self/utils';

	import { RoleTypeEnum } from '$api/openapi';
	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';

	$: baseRoute = getRoute({
		entity: 'lease',
		id: $page.params['leaseId']!,
		pageType: PageType.Id,
		params: $page.params,
	});

	$: tabs = [
		{ label: 'Info', href: baseRoute },
		{
			label: 'Invoices',
			href: `${baseRoute}/invoices`,
			roles: [RoleTypeEnum.Orgadmin, RoleTypeEnum.Portfolio],
		},
	];
</script>

<WideTabBar {tabs} />
