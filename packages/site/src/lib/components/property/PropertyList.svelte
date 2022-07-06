<script lang="ts">
	import { page } from '$app/stores';
	import PropertyCard from '$components/property/PropertyCard.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import type { PaginatedPropertyDto } from '@self/sdk';

	export let properties: PaginatedPropertyDto;

	const createHref = $page.url.pathname.startsWith('/portfolios')
		? `/new/properties?portfolioId=${$page.url.pathname.split('/').pop()}`
		: '/new/properties';
</script>

<StackedList
	entityTitle="properties"
	count={properties.results.length}
	{createHref}
>
	{#each properties.results as property, idx (property.id)}
		<li>
			<PropertyCard {property} {idx} />
		</li>
	{/each}
	<AnchorPagination pagination={properties.pagination} />
</StackedList>
