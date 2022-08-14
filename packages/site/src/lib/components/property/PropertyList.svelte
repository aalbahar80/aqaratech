<script lang="ts">
	import { page } from '$app/stores';
	import PropertyCard from '$components/property/PropertyCard.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { create } from '$lib/utils/route-helpers';
	import type { PaginatedPropertyDto } from '@self/sdk';

	export let properties: PaginatedPropertyDto;

	const formUrl = create({
		entity: 'property',
		predefined:
			$page.url.pathname.startsWith('/portfolios') &&
			new Map<string, any>([
				['portfolioId', $page.url.pathname.split('/').pop()],
			]),
	});
</script>

<StackedList entity="property" count={properties.results.length} {formUrl}>
	{#each properties.results as property, idx (property.id)}
		<li>
			<PropertyCard {property} {idx} />
		</li>
	{/each}
	<AnchorPagination pagination={properties.pagination} />
</StackedList>
