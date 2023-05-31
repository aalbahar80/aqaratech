<script lang="ts">
	import { page } from '$app/stores';
	import {
		entity,
		getRoute,
		PageType,
		PageTab,
		PageTypePortfolio,
	} from '@self/utils';

	import { RoleTypeEnum } from '$api/openapi';
	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';
	import HeroiconsArrowTopRightOnSquareSolid from '~icons/heroicons/arrow-top-right-on-square-solid';

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
		{
			label: $page.data.tabLabels![PageType.Id],
			href: baseRoute,
		},
		{
			label: $page.data.tabLabels!.financials,
			href: financialsRoute,
			icon: HeroiconsArrowTopRightOnSquareSolid,
		},
		{
			label: $page.data.tabLabels![PageTab.Occupancy],
			href: `${baseRoute}/occupancy`,
		},
		{
			label: $page.data.tabLabels![PageTab.Units],
			href: `${baseRoute}/units`,
		},
		{
			label: $page.data.tabLabels![PageTab.Files],
			href: `${baseRoute}/files`,
			roles: [RoleTypeEnum.Orgadmin, RoleTypeEnum.Portfolio],
		},
		{
			label: $page.data.tabLabels![PageTab.Maintenance],
			href: `${baseRoute}/${entity.maintenanceOrder.urlName}`,
		},
	];
</script>

<WideTabBar {tabs} />
