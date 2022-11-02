<script lang="ts">
	import PortfolioList from '$lib/components/portfolio/PortfolioList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PortfolioList portfolios={data.portfolios} />
