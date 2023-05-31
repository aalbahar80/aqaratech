<script lang="ts">
	import { page } from '$app/stores';
	import {
		entity,
		getRoute,
		PageTab,
		PageType,
		PageTypePortfolio,
	} from '@self/utils';

	import { RoleTypeEnum } from '$api/openapi';
	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';
	import HeroiconsArrowTopRightOnSquareSolid from '~icons/heroicons/arrow-top-right-on-square-solid';

	$: baseRoute = getRoute({
		entity: 'unit',
		id: $page.params['unitId']!,
		pageType: PageType.Id,
		params: $page.params,
	});

	$: financialsRoute = getRoute({
		entity: 'portfolio',
		id: $page.params['portfolioId']!,
		pageType: PageTypePortfolio.Summary,
		params: $page.params,
		predefined: {
			propertyId: $page.data['unit'].propertyId,
			unitId: $page.params['unitId']!,
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
			label: $page.data.tabLabels![PageTab.Leases],
			href: `${baseRoute}/leases`,
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
