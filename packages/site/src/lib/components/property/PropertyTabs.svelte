<script lang="ts">
	import { page } from '$app/stores';

	import { entity, getRoute, PageType, PageTypePortfolio } from '@self/utils';

	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';

	$: baseRoute = getRoute({
		entity: 'property',
		id: $page.params['propertyId']!,
		pageType: PageType.Id,
		params: $page.params,
	});

	$: financialsRoute = getRoute({
		entity: 'portfolio',
		id: $page.params['portfolioId']!,
		pageType: PageTypePortfolio.Summary,
		params: $page.params,
		predefined: {
			propertyId: $page.params['propertyId']!,
		},
	});

	$: tabs = [
		{ label: 'Info', href: baseRoute },
		{
			label: 'Financials',
			isExternal: true,
			href: financialsRoute,
		},
		{ label: 'Occupancy', href: `${baseRoute}/occupancy` },
		{ label: 'Units', href: `${baseRoute}/units` },
		{ label: 'Files', href: `${baseRoute}/files` },
		{
			label: 'Maintenance',
			href: `${baseRoute}/${entity.maintenanceOrder.urlName}`,
		},
	];
</script>

<WideTabBar {tabs} />
