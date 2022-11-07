<script lang="ts">
	import PortfolioPage from '$lib/components/portfolio/PortfolioPage.svelte';
	import PortfolioTabs from '$lib/components/portfolio/PortfolioTabs.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<PortfolioPage portfolio={data.portfolio} />

<PortfolioTabs />

<slot />
