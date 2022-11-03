<script lang="ts">
	import type { PaginatedPortfolioDto } from '$api/openapi';
	import { page } from '$app/stores';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import PortfolioCard from '$lib/components/portfolio/PortfolioCard.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { getRoute } from '$lib/utils/route-helpers/get-route';
	import { PageType } from '$lib/utils/route-helpers/route-helpers.type';

	export let portfolios: PaginatedPortfolioDto;
</script>

<StackedList
	entity="portfolio"
	count={portfolios.results.length}
	formUrl={getRoute({
		entity: 'portfolio',
		pageType: PageType.New,
		params: $page.params,
	})}
>
	{#each portfolios.results as portfolio (portfolio.id)}
		<li>
			<PortfolioCard {portfolio} />
		</li>
	{/each}
	<AnchorPagination pagination={portfolios.pagination} />
</StackedList>
