<script lang="ts">
	import { page } from '$app/stores';
	import { getRoute, PageTab, PageType } from '@self/utils';

	import L from '$i18n/i18n-svelte';
	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';
	import { environment } from '$lib/environment';

	$: baseRouteConfig = {
		entity: 'organization',
		id: $page.params['organizationId']!,
		params: {
			lang: $page.params['lang']!,
		},
	} as const;

	$: tabs = [
		{
			label: $page.data.tabLabels![PageType.Id],
			href: getRoute({
				...baseRouteConfig,
				pageType: PageType.Id,
			}),
		},
		{
			label: $page.data.tabLabels![PageTab.Roles],
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Roles,
			}),
		},
		{
			label: $L.nav.billing(),
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.Billing,
			}),
		},
		{
			label: $L.entity.expenseCategory.plural(),
			href: getRoute({
				...baseRouteConfig,
				pageType: PageTab.ExpenseCategories,
			}),
		},
		{
			label: 'Zoho',
			isExternal: true,
			href: environment.PUBLIC_ZOHO_PORTAL_URL,
		},
	];
</script>

<WideTabBar {tabs} />
