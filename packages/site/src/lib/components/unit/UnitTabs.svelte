<script lang="ts">
	import { page } from '$app/stores';
	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';
	import { getRoute, PageType, PageTypePortfolio } from '@self/utils';

	$: baseRoute = getRoute({
		entity: 'unit',
		id: $page.params.unitId!,
		pageType: PageType.Id,
		params: $page.params,
	});

	$: financialsBaseRoute = getRoute({
		entity: 'portfolio',
		id: $page.params.portfolioId!,
		pageType: PageTypePortfolio.Summary,
		params: $page.params,
	});

	$: tabs = [
		{ label: 'Info', href: baseRoute },
		{
			label: 'Financials',
			isExternal: true,
			href:
				financialsBaseRoute +
				'?' +
				new URLSearchParams({
					propertyId: $page.data.unit.propertyId,
					unitId: $page.params.unitId!,
				}).toString(),
		},
		{ label: 'Leases', href: `${baseRoute}/leases` },
		{ label: 'Files', href: `${baseRoute}/files` },
	];
</script>

<WideTabBar {tabs} />
