<script lang="ts">
	import type { LayoutData } from './$types';

	import PortfolioPage from '$lib/components/portfolio/PortfolioPage.svelte';
	import PortfolioTabs from '$lib/components/portfolio/PortfolioTabs.svelte';

	export let data: LayoutData;
</script>

<!-- Hide tabs if not orgadmin -->
{#if data?.user?.role?.roleType === 'ORGADMIN'}
	<PortfolioPage portfolio={data.portfolio} />

	<PortfolioTabs />

	<slot />
{:else}
	<slot />
{/if}
