<script lang="ts">
	import type { PaginatedPropertyDto } from '$api/openapi';
	import { page } from '$app/stores';
	import PropertyCard from '$components/property/PropertyCard.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { getRoute } from '$lib/utils/route-helpers/get-route';
	import { PageType } from '$lib/utils/route-helpers/route-helpers.type';

	export let properties: PaginatedPropertyDto;
</script>

<StackedList
	entity="property"
	count={properties.results.length}
	formUrl={getRoute({
		entity: 'property',
		pageType: PageType.New,
		params: $page.params,
		predefined: {
			portfolioId: $page.params.portfolioId,
		},
	})}
>
	{#each properties.results as property, idx (property.id)}
		<li>
			<PropertyCard {property} {idx} />
		</li>
	{/each}
	<AnchorPagination pagination={properties.pagination} />
</StackedList>
