<script lang="ts">
	import { page } from '$app/stores';
	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';
	import { getRoute } from '$lib/utils/route-helpers/get-route';
	import { PageType } from '$lib/utils/route-helpers/route-helpers.type';

	$: baseRoute = getRoute({
		entity: 'tenant',
		id: $page.params.tenantId!,
		pageType: PageType.Id,
		params: $page.params,
	});

	$: tabs = [
		{ label: 'Info', href: baseRoute },
		{ label: 'Leases', href: `${baseRoute}/leases` },
		{ label: 'Files', href: `${baseRoute}/files` },
	];
</script>

<WideTabBar {tabs} />
