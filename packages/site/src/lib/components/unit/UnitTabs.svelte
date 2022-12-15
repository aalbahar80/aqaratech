<script lang="ts">
	import { page } from '$app/stores';

	import { entity, getRoute, PageType, PageTypePortfolio } from '@self/utils';

	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';

	$: baseRoute = getRoute({
		entity: 'unit',
		id: $page.params.unitId!,
		pageType: PageType.Id,
		params: $page.params,
	});

	$: financialsRoute = getRoute({
		entity: 'portfolio',
		id: $page.params.portfolioId!,
		pageType: PageTypePortfolio.Summary,
		params: $page.params,
		predefined: {
			propertyId: $page.data.unit.propertyId,
			unitId: $page.params.unitId!,
		},
	});

	$: tabs = [
		{ label: 'Info', href: baseRoute },
		{
			label: 'Financials',
			isExternal: true,
			href: financialsRoute,
		},
		{ label: 'Leases', href: `${baseRoute}/leases` },
		{ label: 'Files', href: `${baseRoute}/files` },
		{
			label: 'Maintenance',
			href: `${baseRoute}/${entity.maintenanceOrder.urlName}`,
		},
	];
</script>

<WideTabBar {tabs} />
