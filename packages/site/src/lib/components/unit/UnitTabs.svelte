<script lang="ts">
	import { page } from '$app/stores';
	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';
	import { getRoute } from '$lib/utils/route-helpers/get-route';
	import { PageType } from '$lib/utils/route-helpers/route-helpers.type';

	$: baseRoute = getRoute({
		entity: 'unit',
		id: $page.params.unitId!,
		pageType: PageType.Id,
		params: $page.params,
	});

	$: tabs = [
		{ label: 'Info', href: baseRoute },
		{ label: 'Financials', href: `${baseRoute}/financials` },
		{ label: 'Leases', href: `${baseRoute}/leases` },
		{ label: 'Files', href: `${baseRoute}/files` },
	];
</script>

<WideTabBar {tabs} />
