<script lang="ts">
	import { page } from '$app/stores';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import PortfolioCard from '$lib/components/portfolio/PortfolioCard.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { create } from '$lib/utils/route-helpers';
	import type { PaginatedPortfolioDto } from '$api/openapi';

	export let portfolios: PaginatedPortfolioDto;
</script>

<StackedList
	entity="portfolio"
	count={portfolios.results.length}
	formUrl={create({
		entity: 'portfolio',
		predefined:
			$page.url.pathname.startsWith('/properties') &&
			new Map([['propertyId', $page.url.pathname.split('/').pop()]]),
	})}
>
	{#each portfolios.results as portfolio (portfolio.id)}
		<li>
			<PortfolioCard {portfolio} />
		</li>
	{/each}
	<AnchorPagination pagination={portfolios.pagination} />
</StackedList>
