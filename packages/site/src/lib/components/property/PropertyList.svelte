<script lang="ts">
	import { page } from '$app/stores';
	import PropertyCard from '$components/property/PropertyCard.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { create } from '$lib/utils/route-helpers';
	import type { PaginatedPropertyDto } from '$api/openapi';

	export let properties: PaginatedPropertyDto;
</script>

<StackedList
	entity="property"
	count={properties.results.length}
	formUrl={create({
		entity: 'property',
		predefined:
			$page.url.pathname.startsWith('/portfolios') &&
			new Map([['portfolioId', $page.url.pathname.split('/').pop()]]),
	})}
>
	{#each properties.results as property, idx (property.id)}
		<li>
			<PropertyCard {property} {idx} />
		</li>
	{/each}
	<AnchorPagination pagination={properties.pagination} />
</StackedList>
