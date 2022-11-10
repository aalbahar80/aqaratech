<script lang="ts">
	import { page } from '$app/stores';
	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';
	import { getRoute, PageType } from '@self/utils';

	$: baseRoute = getRoute({
		entity: 'tenant',
		id: $page.params.tenantId!,
		pageType: PageType.Id,
		params: $page.params,
	});

	$: tabs = [
		{ label: 'Info', href: baseRoute },
		{ label: 'Leases', href: `${baseRoute}/leases` },
		{ label: 'Users', href: `${baseRoute}/roles` },
		{ label: 'Files', href: `${baseRoute}/files` },
	];
</script>

<WideTabBar {tabs} />
