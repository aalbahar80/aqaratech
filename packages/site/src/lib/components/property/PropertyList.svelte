<script lang="ts">
	import type { PaginatedPropertyDto } from '$api/openapi';
	import { page } from '$app/stores';
	import PropertyCard from '$components/property/PropertyCard.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { portfolioRoute } from '$lib/utils/route-helpers';

	export let properties: PaginatedPropertyDto;
</script>

<StackedList
	entity="property"
	count={properties.results.length}
	formUrl={`${portfolioRoute({ params: $page.params })}/properties/new`}
>
	{#each properties.results as property, idx (property.id)}
		<li>
			<PropertyCard {property} {idx} />
		</li>
	{/each}
	<AnchorPagination pagination={properties.pagination} />
</StackedList>
