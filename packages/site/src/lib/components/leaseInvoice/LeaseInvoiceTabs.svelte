<script lang="ts">
	import { page } from '$app/stores';

	import { getRoute, PageType } from '@self/utils';

	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';

	$: baseRoute = getRoute({
		entity: 'leaseInvoice',
		id: $page.params['leaseInvoiceId']!,
		pageType: PageType.Id,
		params: $page.params,
	});

	$: tabs = [
		{ label: 'Info', href: baseRoute },
		{ label: 'Files', href: `${baseRoute}/files` },
	];
</script>

<WideTabBar {tabs} />
