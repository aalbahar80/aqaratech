<script lang="ts">
	import PortfolioTable from '$lib/components/portfolio/PortfolioTable.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PortfolioTable data={data.portfolios} />
