<script lang="ts">
	import WideTabBar from '$lib/components/tabs/WideTabBar.svelte';
	import { getRoute, PageType } from '@self/utils';

	import { page } from '$app/stores';

	$: baseRoute = getRoute({
		entity: 'leaseInvoice',
		id: $page.params.leaseInvoiceId!,
		pageType: PageType.Id,
		params: $page.params,
	});

	$: tabs = [
		{ label: 'Info', href: baseRoute },
		{ label: 'Files', href: `${baseRoute}/files` },
	];
</script>

<WideTabBar {tabs} />
