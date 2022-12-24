<script lang="ts">
	import type { PageData } from './$types';

	import PortfolioTable from '$lib/components/portfolio/PortfolioTable.svelte';

	export let data: PageData;
</script>

<PortfolioTable data={data.portfolios} />
