<script lang="ts">
	import { page } from '$app/stores';
	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';
	import { getRoute } from '$lib/utils/route-helpers/get-route';
	import { PageType } from '$lib/utils/route-helpers/route-helpers.type';

	$: baseRoute = getRoute({
		entity: 'property',
		id: $page.params.propertyId!,
		pageType: PageType.Id,
		params: $page.params,
	});

	$: tabs = [
		{ label: 'Info', href: baseRoute },
		{ label: 'Financials', href: `${baseRoute}/financials` },
		{ label: 'Occupancy', href: `${baseRoute}/occupancy` },
		{ label: 'Units', href: `${baseRoute}/units` },
		{ label: 'Files', href: `${baseRoute}/files` },
	];
</script>

<WideTabBar {tabs} />
